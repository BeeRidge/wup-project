const express = require('express');
const mysql = require('mysql2'); // Use mysql2 for better support
const cors = require('cors');
const bodyParser = require('body-parser');
const { create } = require('xmlbuilder2'); // Library to build XML
const multer = require('multer'); // Middleware for handling file uploads
const { parseStringPromise } = require('xml2js'); // Library to parse XML into JSON

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'prototype'
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        process.exit(1); // Exit if the database connection fails
    }
    console.log("Connected to database");
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

/* ------------------------------------------------------------------------------------------------------------- */
// Convert MySQL Data to XML API
app.get('/api/export-xml', (req, res) => {
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
            const xml = create({ version: '1.0' })
                .ele('members')
                .ele(data.map(row => {
                    const member = {};
                    for (const key in row) {
                        member[key] = row[key];
                    }
                    return { member };
                }))
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
app.post('/api/import-xml', upload.single('file'), async (req, res) => {
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
            member.MobileNumber && member.MobileNumber[0] ? member.MobileNumber[0] : null, // Handle optional field
            member.Balance[0],
            member.DateofBirth[0],
            member.RegistrationDate[0],
        ]);

        db.query(sql, [values], (err) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({ error: "Failed to insert data into the database" });
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
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const sql = "SELECT * FROM admin WHERE Username = ? AND Password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length > 0) {
            return res.json({ status: "success", message: "Login successful" });
        } else {
            return res.status(401).json({ status: "error", message: "Invalid username or password" });
        }
    });
});
/* ------------------------------------------------------------------------------------------------------------- */
// Show members, 1st Tranche, and 2nd Tranche
app.get('/api/member', (req, res) => {
    const sql = `SELECT * FROM member ORDER BY RegistrationDate DESC`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/api/fstranche', (req, res) => {
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

app.get('/api/sndTranche', (req, res) => {
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
app.get('/api/MemberCount', (req, res) => {
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
app.get('/api/FirstTranche', (req, res) => {
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
app.get('/api/SecondTranche', (req, res) => {
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
app.get('/api/MonthlyConsultation', (req, res) => {
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
app.get('/api/DiseaseCount', (req, res) => {
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
app.get('/api/reports', (req, res) => {
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
