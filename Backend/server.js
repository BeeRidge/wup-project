const express = require("express");
const mysql = require("mysql2"); // Use mysql2 for better support
const cors = require("cors");
const bodyParser = require("body-parser");
const { create } = require("xmlbuilder2"); // Library to build XML
const multer = require("multer"); // Middleware for handling file uploads
const { parseStringPromise } = require("xml2js"); // Library to parse XML into JSON

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "prototype",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    process.exit(1); // Exit if the database connection fails
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

/* ------------------------------------------------------------------------------------------------------------- */
// Utility function to log actions
const logAction = (action, description) => {
  const sql = `INSERT INTO logs (action, description) VALUES (?, ?)`;
  db.query(sql, [action, description], (err) => {
    if (err) {
      console.error("Failed to log action:", err.message);
    }
  });
};

/* ------------------------------------------------------------------------------------------------------------- */
// Convert MySQL Data to XML API
app.get("/api/export-xml", (req, res) => {
  const sql = `
    SELECT PinNumber, MemberType, FirstName, MiddleName, LastName, SuffixName, Sex, MobileNumber, Balance, 
    DATE_FORMAT(DateofBirth, '%Y-%m-%d') AS DateofBirth,
    DATE_FORMAT(RegistrationDate, '%Y-%m-%d') AS RegistrationDate 
    FROM member 
    ORDER BY RegistrationDate DESC
    `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data available to export" });
    }

    try {
      const xml = create({ version: "1.0" })
        .ele("members")
        .ele(
          data.map((row) => {
            const member = {};
            for (const key in row) {
              member[key] = row[key];
            }
            return { member };
          })
        )
        .end({ prettyPrint: true });

      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Content-Disposition", "attachment; filename=members.xml");
      res.status(200).send(xml);
    } catch (conversionError) {
      console.error("Error converting data to XML:", conversionError);
      res.status(500).json({ error: "Failed to convert data to XML" });
    }
  });
});

/* ------------------------------------------------------------------------------------------------------------- */
// Import Data API
app.post("/api/import-xml", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File uploaded:", req.file.originalname);

    // Parse the XML file
    const xmlData = req.file.buffer.toString();
    console.log("XML Data:", xmlData);

    const jsonData = await parseStringPromise(xmlData);
    console.log("Parsed JSON Data:", jsonData);

    // Extract and validate the data
    const members = jsonData.members.member;
    if (!members || !Array.isArray(members)) {
      console.error("Invalid XML format");
      return res.status(400).json({ error: "Invalid XML format" });
    }

    console.log("Members to insert:", members);

    // Insert data into the database
    const sql = `
            INSERT INTO proto (
                PinNumber, MemberType, FirstName, MiddleName, LastName, SuffixName, 
                Sex, MobileNumber, Balance, DateofBirth, RegistrationDate
            ) VALUES ?
        `;
    const values = members.map((member) => [
      member.PinNumber[0],
      member.MemberType[0],
      member.FirstName[0],
      member.MiddleName ? member.MiddleName[0] : null, // Handle optional field
      member.LastName[0],
      member.SuffixName && member.SuffixName[0] ? member.SuffixName[0] : null, // Handle optional field
      member.Sex[0],
      member.MobileNumber && member.MobileNumber[0]
        ? member.MobileNumber[0]
        : null, // Handle optional field
      member.Balance[0],
      member.DateofBirth[0],
      member.RegistrationDate[0],
    ]);

    db.query(sql, [values], (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert data into the database" });
      }
      res.status(200).json({ message: "Data imported successfully" });
    });
  } catch (error) {
    console.error("Error importing data:", error);
    res.status(500).json({ error: "Failed to import data" });
  }
});

/* ------------------------------------------------------------------------------------------------------------- */
// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const sql = "SELECT * FROM admin WHERE Username = ? AND Password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ status: "success", message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid username or password" });
    }
  });
});
/* ------------------------------------------------------------------------------------------------------------- */
// Show members, 1st Tranche, and 2nd Tranche
app.get("/api/member", (req, res) => {
  const sql = `SELECT * FROM member ORDER BY RegistrationDate DESC`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/api/fstranche", (req, res) => {
  const sql = `
        SELECT * 
        FROM member AS m
        LEFT JOIN healthassessment AS h ON m.PinNumber = h.PinNumber
        WHERE m.PinNumber = h.PinNumber
        ORDER BY h.AssessmentDate DESC`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/sndTranche", (req, res) => {
  const sql = `
        SELECT * 
        FROM member AS m
        LEFT JOIN consultation AS c ON m.PinNumber = c.PinNumber
        LEFT JOIN healthassessment AS h ON m.PinNumber = h.PinNumber
        WHERE m.PinNumber = c.PinNumber
        ORDER BY c.ConsultationDate DESC`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/* ------------------------------------------------------------------------------------------------------------- */
// Counting Total Stats
app.get("/api/MemberCount", (req, res) => {
  const sql = `
        SELECT COUNT(*) 
        AS TotalMembers 
        FROM member
    `;

  db.query(sql, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data[0]);
  });
});
app.get("/api/FirstTranche", (req, res) => {
  const sql = `
        SELECT COUNT(*) 
        AS FirstTranche
        FROM healthassessment
    `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data[0]); // Return only the object instead of an array
  });
});
app.get("/api/SecondTranche", (req, res) => {
  const sql = ` 
        SELECT COUNT(*)
        AS SecondTranche 
        FROM consultation
    `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data[0]); // Return only the object instead of an array
  });
});
/* ----------------------------------------------------------------------------------------------------------- */
// Count the patient for each month
app.get("/api/MonthlyConsultation", (req, res) => {
  const sql = `
                SELECT YEAR(ConsultationDate) AS year, 
                MONTHNAME(ConsultationDate) AS month, 
                COUNT(*) AS TotalRecords
                FROM consultation
                GROUP BY YEAR(ConsultationDate), MONTH(ConsultationDate)
                ORDER BY YEAR(ConsultationDate), MONTH(ConsultationDate);
            `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});
/* ----------------------------------------------------------------------------------------------------------- */
// Count the more disease
app.get("/api/DiseaseCount", (req, res) => {
  const sql = `
        SELECT AssessmentDiagnosis, 
        COUNT(AssessmentDiagnosis) AS DiagnoseDisease 
        FROM consultation
        GROUP BY AssessmentDiagnosis 
        ORDER BY DiagnoseDisease DESC;
    `;

  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});
/* ------------------------------------------------------------------------------------------------------------- */
// Show latest disease report
app.get("/api/reports", (req, res) => {
  const sql = `
        SELECT  * 
        FROM member AS m
        LEFT JOIN consultation AS c ON m.PinNumber = c.PinNumber
        LEFT JOIN healthassessment AS h ON m.PinNumber = h.PinNumber
        WHERE m.PinNumber = c.PinNumber
        ORDER BY c.ConsultationDate DESC
    `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});
/* ------------------------------------------------------------------------------------------------------------- */
// Show latest member table
app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});

//Tranches value API
app.get("/api/tranches", (req, res) => {
  const sql = `
        SELECT m.PinNumber, m.Balance, c.ConNumber
        FROM member AS m
        LEFT JOIN consultation AS c ON m.PinNumber = c.PinNumber
    `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

app.post("/api/tranches", (req, res) => {
  const { pinNumber, actionType } = req.body;

  if (!pinNumber || !actionType) {
    return res
      .status(400)
      .json({ error: "PinNumber and actionType are required." });
  }

  // Define the deduction amounts
  const DEDUCTIONS = {
    HealthAssessment: 200,
    Consultation: 1000,
  };

  // Fetch the member's details
  const fetchMemberSql = `
        SELECT MemberType, Balance 
        FROM member 
        WHERE PinNumber = ?
    `;

  db.query(fetchMemberSql, [pinNumber], (err, result) => {
    if (err) {
      console.error("Error fetching member details:", err.message);
      return res.status(500).json({ error: "Failed to fetch member details." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Member not found." });
    }

    const member = result[0];
    let newBalance = member.Balance;

    // Determine the initial balance based on MemberType
    if (member.MemberType === "Member") {
      newBalance = 1500;
    } else if (member.MemberType === "NonMember") {
      newBalance = 1700;
    }

    // Apply deductions based on the action type
    if (actionType === "HealthAssessment") {
      newBalance -= DEDUCTIONS.HealthAssessment;
    } else if (actionType === "Consultation") {
      newBalance -= DEDUCTIONS.Consultation;
    } else {
      return res.status(400).json({ error: "Invalid actionType provided." });
    }

    // Ensure the balance doesn't go below zero
    if (newBalance < 0) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    // Update the member's balance in the database
    const updateBalanceSql = `
            UPDATE member 
            SET Balance = ? 
            WHERE PinNumber = ?
        `;

    db.query(updateBalanceSql, [newBalance, pinNumber], (updateErr) => {
      if (updateErr) {
        console.error("Error updating balance:", updateErr.message);
        return res.status(500).json({ error: "Failed to update balance." });
      }

      // Log the action
      logAction(
        "Balance Update",
        `Updated balance for PinNumber: ${pinNumber}. Action: ${actionType}. New Balance: ${newBalance}`
      );

      return res.json({ message: "Balance updated successfully.", newBalance });
    });
  });
});

app.get("/api/logs", (req, res) => {
  const sql = `SELECT * FROM logs ORDER BY timestamp DESC`;
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Failed to fetch logs:", err.message);
      return res.status(500).json({ error: "Failed to fetch logs." });
    }
    return res.json(data);
  });
});

app.post("/api/update-nonmember-balances", (req, res) => {
  const { balanceValue } = req.body;

  // Validate the input
  if (!balanceValue || isNaN(balanceValue)) {
    return res
      .status(400)
      .json({ error: "A valid balance value is required." });
  }

  // Update the balance for all non-members to the specified value
  const updateBalanceSql = `
        UPDATE member
        SET Balance = ?
        WHERE MemberType = 'NON MEMBER';
    `;

  db.query(updateBalanceSql, [balanceValue], (err, result) => {
    if (err) {
      console.error("Error updating non-member balances:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to update non-member balances." });
    }

    return res.json({
      message: "Non-member balances updated successfully.",
      affectedRows: result.affectedRows,
    });
  });
});

// Add Member API
app.post("/api/add-member", (req, res) => {
  const {
    PinNumber,
    MemberType,
    LastName,
    FirstName,
    MiddleName,
    SuffixName,
    DateofBirth,
    Sex,
    MobileNumber,
    RegistrationDate,
    Balance,
  } = req.body;

  // Validate required fields
  if (
    !PinNumber ||
    !MemberType ||
    !LastName ||
    !FirstName ||
    !DateofBirth ||
    !Sex ||
    !MobileNumber ||
    !RegistrationDate ||
    Balance === undefined
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  // SQL query to insert a new member
  const sql = `
        INSERT INTO member (
            PinNumber, MemberType, LastName, FirstName, MiddleName, SuffixName, 
            DateofBirth, Sex, MobileNumber, RegistrationDate, Balance
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    PinNumber,
    MemberType,
    LastName,
    FirstName,
    MiddleName || null, // Handle optional fields
    SuffixName || null, // Handle optional fields
    DateofBirth,
    Sex,
    MobileNumber,
    RegistrationDate,
    Balance,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding member:", err.message);
      return res.status(500).json({ error: "Failed to add member." });
    }

    // Log the action
    logAction(
      "Add Member",
      `Added new member: ${FirstName} ${LastName} (PinNumber: ${PinNumber})`
    );

    return res.status(201).json({
      message: "Member added successfully.",
      memberId: result.insertId,
    });
  });
});

// Add Health Assessment API
app.post("/api/add-health-assessment", (req, res) => {
  const {
    PinNumber,
    HSANumber,
    AssessmentDate,
    PastMedicalHistory,
    PastSurgery,
    FamilyHistory,
    PersonalSocialHistory,
    Immunizations,
    FamilyPlanning,
    MenstrualHistory,
    PregnancyHistory,
    PhysicalExaminationFindings,
    PertinentFindings,
  } = req.body;

  // Validate required fields
  if (!PinNumber || !HSANumber || !AssessmentDate) {
    return res
      .status(400)
      .json({
        error: "PinNumber, HSANumber, and AssessmentDate are required.",
      });
  }

  // SQL query to insert a new health assessment
  const sql = `
        INSERT INTO healthassessment (
            PinNumber, HSANumber, AssessmentDate, PastMedicalHistory, PastSurgery, FamilyHistory, 
            PersonalSocialHistory, Immunizations, FamilyPlanning, MenstrualHistory, PregnancyHistory, 
            PhysicalExaminationFindings, PertinentFindings
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    PinNumber,
    HSANumber,
    AssessmentDate,
    PastMedicalHistory || null, // Handle optional fields
    PastSurgery || null,
    FamilyHistory || null,
    PersonalSocialHistory || null,
    Immunizations || null,
    FamilyPlanning || null,
    MenstrualHistory || null,
    PregnancyHistory || null,
    PhysicalExaminationFindings || null,
    PertinentFindings || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding health assessment:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to add health assessment." });
    }

    // Log the action
    logAction(
      "Add Health Assessment",
      `Added health assessment for PinNumber: ${PinNumber} (HSANumber: ${HSANumber})`
    );

    return res.status(201).json({
      message: "Health assessment added successfully.",
      healthAssessmentId: result.insertId,
    });
  });
});

app.get("/api/health-assessment/:HSANumber", (req, res) => {
  const { HSANumber } = req.params;

  const sql = `
        SELECT 
            healthassessment.*, 
            member.MemberType, 
            member.FirstName, 
            member.LastName, 
            member.MiddleName, 
            member.SuffixName, 
            member.Sex 
        FROM healthassessment
        JOIN member ON healthassessment.PinNumber = member.PinNumber
        WHERE healthassessment.HSANumber = ?
    `;

  db.query(sql, [HSANumber], (err, result) => {
    if (err) {
      console.error("Error fetching health assessment:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch health assessment." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Health assessment not found." });
    }

    console.log("Health assessment data:", result[0]); // Debugging
    return res.json(result[0]);
  });
});

app.post("/api/add-consultation", (req, res) => {
  console.log("Request Body:", req.body); // Log the incoming request body

  const {
    PinNumber,
    ConsultationNumber,
    ConsultationDate,
    ChiefComplaint,
    BloodPressure,
    HeartRate,
    RespiratoryRate,
    VisualAcuityLeftEye,
    VisualAcuityRightEye,
    Height,
    Weight,
    BMI,
    Temperature,
    HEENT,
    ChestBreastLungs,
    Heart,
    Abdomen,
    Genitourinary,
    RectalExam,
    ExtremitiesSkin,
    NeurologicalExam,
    AssessmentDiagnosis,
    Laboratory,
    HSANumber, // Include HSANumber in the request body
  } = req.body;

  if (
    !PinNumber ||
    !ConsultationNumber ||
    !ConsultationDate ||
    !AssessmentDiagnosis ||
    !HSANumber
  ) {
    console.error("Validation failed: Missing required fields");
    return res.status(400).json({
      error:
        "PinNumber, ConsultationNumber, ConsultationDate, AssessmentDiagnosis, and HSANumber are required.",
    });
  }

  // Check if the HSANumber exists in the healthassessment table
  const checkHSASql = `SELECT HSANumber FROM healthassessment WHERE HSANumber = ? AND PinNumber = ?`;
  db.query(checkHSASql, [HSANumber, PinNumber], (err, result) => {
    if (err) {
      console.error("Error checking HSANumber:", err.message);
      return res.status(500).json({ error: "Failed to validate HSANumber." });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid HSANumber or PinNumber." });
    }

    // Proceed to insert the consultation
    const sql = `
            INSERT INTO consultation (
                PinNumber, ConNumber, ConsultationDate, ChiefComplaint, BloodPressure, HeartRate, 
                RespiratoryRate, VisualAcuityLeftEye, VisualAcuityRightEye, Height, Weight, BMI, 
                Temperature, HEENT, ChestBreastLungs, Heart, Abdomen, Genitourinary, RectalExam, 
                ExtremitiesSkin, NeurologicalExam, AssessmentDiagnosis, Laboratory, HSANumber
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      PinNumber,
      ConsultationNumber,
      ConsultationDate,
      ChiefComplaint || null,
      BloodPressure || null,
      HeartRate || null,
      RespiratoryRate || null,
      VisualAcuityLeftEye || null,
      VisualAcuityRightEye || null,
      Height || null,
      Weight || null,
      BMI || null,
      Temperature || null,
      HEENT || null,
      ChestBreastLungs || null,
      Heart || null,
      Abdomen || null,
      Genitourinary || null,
      RectalExam || null,
      ExtremitiesSkin || null,
      NeurologicalExam || null,
      AssessmentDiagnosis,
      Laboratory || null,
      HSANumber, // Include HSANumber in the values
    ];

    console.log("SQL Query:", sql); // Log the SQL query
    console.log("Values:", values); // Log the values being inserted

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database Error:", err.message); // Log database errors
        return res.status(500).json({ error: "Failed to add consultation." });
      }

      console.log("Consultation added successfully:", result.insertId); // Log success
      return res.status(201).json({
        message: "Consultation added successfully.",
        consultationId: result.insertId,
      });
    });
  });
});

app.get("/api/consultations", (req, res) => {
  const sql = `
        SELECT 
            PinNumber,
            ConNumber,
            ConsultationDate,
            ChiefComplaint,
            BloodPressure,
            HeartRate,
            RespiratoryRate,
            VisualAcuityLeftEye,
            VisualAcuityRightEye,
            Height,
            Weight,
            BMI,
            Temperature,
            HEENT,
            ChestBreastLungs,
            Heart,
            Abdomen,
            Genitourinary,
            RectalExam,
            ExtremitiesSkin,
            NeurologicalExam,
            AssessmentDiagnosis,
            Laboratory,
            HSANumber
        FROM consultation
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching consultations:", err.message);
      return res.status(500).json({ error: "Failed to fetch consultations." });
    }

    console.log("Consultations fetched:", results.length); // Debugging
    return res.json(results);
  });
});

app.get("/api/consultation/:ConNumber", (req, res) => {
  const { ConNumber } = req.params;

  const sql = `
        SELECT 
            PinNumber,
            ConNumber,
            ConsultationDate,
            ChiefComplaint,
            BloodPressure,
            HeartRate,
            RespiratoryRate,
            VisualAcuityLeftEye,
            VisualAcuityRightEye,
            Height,
            Weight,
            BMI,
            Temperature,
            HEENT,
            ChestBreastLungs,
            Heart,
            Abdomen,
            Genitourinary,
            RectalExam,
            ExtremitiesSkin,
            NeurologicalExam,
            AssessmentDiagnosis,
            Laboratory,
            HSANumber
        FROM consultation
        WHERE ConNumber = ?
    `;

  db.query(sql, [ConNumber], (err, result) => {
    if (err) {
      console.error("Error fetching consultation:", err.message);
      return res.status(500).json({ error: "Failed to fetch consultation." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Consultation not found." });
    }

    console.log("Consultation fetched:", result[0]); // Debugging
    return res.json(result[0]);
  });
});

app.post("/api/update-balance", (req, res) => {
  const { PinNumber, actionType } = req.body;

  if (!PinNumber || !actionType) {
    return res
      .status(400)
      .json({ error: "PinNumber and actionType are required." });
  }

  // Define the deduction amounts
  const DEDUCTIONS = {
    Consultation: 500,
    Laboratory: 1000,
  };

  // Fetch the user's details
  const fetchUserSql = `
        SELECT MemberType, Balance 
        FROM member 
        WHERE PinNumber = ?
    `;

  db.query(fetchUserSql, [PinNumber], (err, result) => {
    if (err) {
      console.error("Error fetching user details:", err.message);
      return res.status(500).json({ error: "Failed to fetch user details." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = result[0];
    let newBalance = user.Balance;

    // Set initial balance based on MemberType
    if (user.MemberType === "NonMember") {
      newBalance = 1700;
    } else if (user.MemberType === "Member") {
      newBalance = 1500;
    }

    // Deduct balance based on the action type
    if (actionType === "Consultation") {
      newBalance -= DEDUCTIONS.Consultation;
    } else if (actionType === "Laboratory") {
      newBalance = 0; // Set balance to 0 for laboratory
    } else {
      return res.status(400).json({ error: "Invalid actionType provided." });
    }

    // Ensure the balance doesn't go below zero
    if (newBalance < 0) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    // Update the user's balance in the database
    const updateBalanceSql = `
            UPDATE member 
            SET Balance = ? 
            WHERE PinNumber = ?
        `;

    db.query(updateBalanceSql, [newBalance, PinNumber], (updateErr) => {
      if (updateErr) {
        console.error("Error updating balance:", updateErr.message);
        return res.status(500).json({ error: "Failed to update balance." });
      }

      return res.json({ message: "Balance updated successfully.", newBalance });
    });
  });
});

app.post("/api/update-all-balances", (req, res) => {
  const fetchUsersSql = `
        SELECT PinNumber, MemberType 
        FROM member
    `;

  db.query(fetchUsersSql, (err, users) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({ error: "Failed to fetch users." });
    }

    const updatePromises = users.map((user) => {
      return new Promise((resolve, reject) => {
        // Check if the user has a consultation
        const checkConsultationSql = `
                    SELECT ConNumber 
                    FROM consultation 
                    WHERE PinNumber = ?
                `;

        db.query(
          checkConsultationSql,
          [user.PinNumber],
          (err, consultations) => {
            if (err) {
              console.error(
                "Error checking consultations for user:",
                user.PinNumber,
                err.message
              );
              return reject(err);
            }

            let newBalance = 1750; // Default balance for NonMember

            // Adjust balance based on MemberType
            if (user.MemberType === "Member") {
              newBalance -= 750; // Deduct 750 for members
            }

            // If the user has consultations, set balance to 0
            if (consultations.length > 0) {
              newBalance = 0;
            }

            // Update the user's balance in the database
            const updateBalanceSql = `
                        UPDATE member 
                        SET Balance = ? 
                        WHERE PinNumber = ?
                    `;

            db.query(
              updateBalanceSql,
              [newBalance, user.PinNumber],
              (updateErr) => {
                if (updateErr) {
                  console.error(
                    "Error updating balance for user:",
                    user.PinNumber,
                    updateErr.message
                  );
                  return reject(updateErr);
                }

                resolve();
              }
            );
          }
        );
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        res.json({ message: "All balances updated successfully." });
      })
      .catch((updateErr) => {
        console.error("Error updating balances:", updateErr.message);
        res.status(500).json({ error: "Failed to update balances." });
      });
  });
});

app.get("/api/tranche-values", (req, res) => {
    const firstTrancheSql = `
        SELECT COUNT(*) AS FirstTrancheCount
        FROM member AS m
        LEFT JOIN healthassessment AS h ON m.PinNumber = h.PinNumber
        WHERE h.HSANumber IS NOT NULL 
        AND m.MemberType IN ('Member', 'DEPENDENT');
    `;

    const secondTrancheSql = `
        SELECT COUNT(*) AS SecondTrancheCount
        FROM member AS m
        LEFT JOIN consultation AS c ON m.PinNumber = c.PinNumber
        WHERE c.ConNumber IS NOT NULL 
        AND m.MemberType IN ('Member', 'DEPENDENT');
    `;

    // Execute both queries
    db.query(firstTrancheSql, (err, firstTrancheResults) => {
        if (err) {
            console.error("Error fetching first tranche data:", err.message);
            return res.status(500).json({ error: "Failed to fetch first tranche data." });
        }

        db.query(secondTrancheSql, (err, secondTrancheResults) => {
            if (err) {
                console.error("Error fetching second tranche data:", err.message);
                return res.status(500).json({ error: "Failed to fetch second tranche data." });
            }

            // Calculate tranche values
            const firstTrancheCount = firstTrancheResults[0].FirstTrancheCount;
            const secondTrancheCount = secondTrancheResults[0].SecondTrancheCount;

            const firstTrancheValue = firstTrancheCount * 750; // Multiply by 750
            const secondTrancheValue = secondTrancheCount * 1000; // Multiply by 1000

            return res.json({
                message: "Tranche values calculated successfully.",
                firstTranche: {
                    count: firstTrancheCount,
                    value: firstTrancheValue,
                },
                secondTranche: {
                    count: secondTrancheCount,
                    value: secondTrancheValue,
                },
            });
        });
    });
});

app.get("/api/tranche-counts", (req, res) => {
    const firstTrancheSql = `
        SELECT COUNT(*) AS FirstTrancheCount
        FROM member AS m
        LEFT JOIN healthassessment AS h ON m.PinNumber = h.PinNumber
        WHERE h.HSANumber IS NOT NULL 
        AND m.MemberType IN ('Member', 'DEPENDENT');
    `;

    const secondTrancheSql = `
        SELECT COUNT(*) AS SecondTrancheCount
        FROM member AS m
        LEFT JOIN consultation AS c ON m.PinNumber = c.PinNumber
        WHERE c.ConNumber IS NOT NULL 
        AND m.MemberType IN ('Member', 'DEPENDENT');
    `;

    // Execute both queries
    db.query(firstTrancheSql, (err, firstTrancheResults) => {
        if (err) {
            console.error("Error fetching first tranche count:", err.message);
            return res.status(500).json({ error: "Failed to fetch first tranche count." });
        }

        db.query(secondTrancheSql, (err, secondTrancheResults) => {
            if (err) {
                console.error("Error fetching second tranche count:", err.message);
                return res.status(500).json({ error: "Failed to fetch second tranche count." });
            }

            // Combine the counts into a single response
            return res.json({
                message: "Tranche counts fetched successfully.",
                firstTranche: {
                    count: firstTrancheResults[0].FirstTrancheCount,
                },
                secondTranche: {
                    count: secondTrancheResults[0].SecondTrancheCount,
                },
            });
        });
    });
});

app.get("/api/monthly-first-tranche", (req, res) => {
    const sql = `
        SELECT 
            YEAR(h.AssessmentDate) AS year,
            MONTHNAME(h.AssessmentDate) AS month,
            COUNT(*) AS FirstTrancheCount
        FROM member AS m
        LEFT JOIN healthassessment AS h ON m.PinNumber = h.PinNumber
        WHERE h.HSANumber IS NOT NULL 
        AND m.MemberType IN ('Member', 'DEPENDENT')
        GROUP BY YEAR(h.AssessmentDate), MONTH(h.AssessmentDate)
        ORDER BY YEAR(h.AssessmentDate), MONTH(h.AssessmentDate);
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching monthly first tranche data:", err.message);
            return res.status(500).json({ error: "Failed to fetch monthly first tranche data." });
        }
        return res.json({
            message: "Monthly first tranche data fetched successfully.",
            data,
        });
    });
});

app.get("/api/monthly-second-tranche", (req, res) => {
    const sql = `
        SELECT 
            YEAR(c.ConsultationDate) AS year,
            MONTHNAME(c.ConsultationDate) AS month,
            COUNT(*) AS SecondTrancheCount
        FROM member AS m
        LEFT JOIN consultation AS c ON m.PinNumber = c.PinNumber
        WHERE c.ConNumber IS NOT NULL 
        AND m.MemberType IN ('Member', 'DEPENDENT')
        GROUP BY YEAR(c.ConsultationDate), MONTH(c.ConsultationDate)
        ORDER BY YEAR(c.ConsultationDate), MONTH(c.ConsultationDate);
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching monthly second tranche data:", err.message);
            return res.status(500).json({ error: "Failed to fetch monthly second tranche data." });
        }
        return res.json({
            message: "Monthly second tranche data fetched successfully.",
            data,
        });
    });
});


