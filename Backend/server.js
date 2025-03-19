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
    database: 'konsulta'
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
    
    const sql = "SELECT * FROM `tsekap_tbl_hci_profile` WHERE USER_ID = ? AND USER_PASSWORD = ?";
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
// all members with the 1st and 2nd tranche
app.get('/api/profile', (req, res) => {
    const sql = `SELECT ACCRE_NO, PX_TYPE, 
                        PX_LNAME, PX_FNAME, 
                        PX_MNAME, PX_SEX, 
                        PX_EXTNAME, ENLIST_DATE
                FROM tsekap_hist_enlist
                ORDER BY tsekap_hist_enlist.TRANS_DATE DESC`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/api/secondMembers', (req, res) => {
    const sql = `SELECT ACCRE_NO, PX_TYPE, 
                        PX_LNAME, PX_FNAME, 
                        PX_MNAME, PX_SEX, 
                        PX_EXTNAME,ENLIST_DATE, 
                        DATE_ADDED, PX_MOBILE_NO 
                FROM tsekap_tbl_enlist
                ORDER BY tsekap_tbl_enlist.TRANS_DATE DESC`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
/* ------------------------------------------------------------------------------------------------------------- */
// Counting Total Stats
app.get('/api/memberCount', (req, res) => {
    const sql = `SELECT COUNT(*) 
                AS TOTAL_MEMBERS 
                FROM tsekap_hist_enlist`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json(data[0]);
    });
});
app.get('/api/firstTranche', (req, res) => {
    const sql = `
        SELECT COUNT(*) 
        AS FIRST_TRANCHE
        FROM tsekap_hist_enlist
    `;

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data[0]); // Return only the object instead of an array
    });
});
app.get('/api/secondTranche', (req, res) => {
    const sql = ` 
        SELECT COUNT(*)
        AS SECOND_TRANCHE 
        FROM tsekap_tbl_enlist
    `;

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data[0]); // Return only the object instead of an array
    });
});
/* ----------------------------------------------------------------------------------------------------------- */
// Count the patient for each month
app.get('/api/monthlyCheck', (req, res) => {
    const sql =`
                SELECT YEAR(DATE_ADDED) AS year, 
                MONTHNAME(DATE_ADDED) AS month, 
                COUNT(*) AS total_records
                FROM tsekap_tbl_prof_medhist
                GROUP BY YEAR(DATE_ADDED), MONTH(DATE_ADDED)
                ORDER BY YEAR(DATE_ADDED), MONTH(DATE_ADDED);
            `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});
/* ----------------------------------------------------------------------------------------------------------- */
// Count the more disease
app.get('/api/diseaseCount', (req, res) => {
    const sql = `
        SELECT 
            t4.MDISEASE_DESC, 
            COUNT(*) AS DISEASE_COUNT
        FROM tsekap_tbl_profile t2
        JOIN tsekap_tbl_prof_medhist t3 ON t2.TRANS_NO = t3.TRANS_NO
        JOIN tsekap_lib_mdiseases t4 ON t3.MDISEASE_CODE = t4.MDISEASE_CODE
        GROUP BY t4.MDISEASE_DESC
        ORDER BY DISEASE_COUNT DESC;
    `;  

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});
/* ------------------------------------------------------------------------------------------------------------- */
app.get('/api/reports', (req, res) => {
    const sql = `
        SELECT 
            t4.MDISEASE_DESC, 
            t3.DATE_ADDED, 
            t1.ACCRE_NO, 
            t1.PX_TYPE, 
            t1.PX_LNAME, 
            t1.PX_FNAME, 
            t1.PX_MNAME, 
            t1.PX_EXTNAME, 
            t1.PX_SEX
        FROM tsekap_hist_enlist t1
        JOIN tsekap_tbl_profile t2 ON t1.CASE_NO = t2.CASE_NO
        JOIN tsekap_tbl_prof_medhist t3 ON t2.TRANS_NO = t3.TRANS_NO
        JOIN tsekap_lib_mdiseases t4 ON t3.MDISEASE_CODE = t4.MDISEASE_CODE
        ORDER BY t3.DATE_ADDED DESC;
    `;  
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.json(data);
    });
});
/* ------------------------------------------------------------------------------------------------------------- */
app.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
