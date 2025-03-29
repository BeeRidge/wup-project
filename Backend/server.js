const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({  
    host: "localhost",
    user: 'root',
    password: '',
    database: 'ekonsultaprototype'
});
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database");
});
app.get('/', (req, res) => {
    return res.json("From Backend Side");
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
    const sql =`
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
        ORDER BY DiagnoseDisease;
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
        SELECT 
            t2.id,
            t2.ConNumber,
            t2.AssessmentDiagnosis,
            t2.ConsultationDate,
            t1.PinNumber,
            t1.MemberType,
            t1.FirstName,
            t1.MiddleName,
            t1.LastName,
            t1.SuffixName
            FROM consultation AS t2, member AS t1
            WHERE t2.PinNumber = t1.PinNumber;
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
