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

app.get('/api/profile', (req, res) => {
    const sql = "SELECT ACCRE_NO, PX_TYPE, PX_LNAME, PX_FNAME, PX_MNAME, PX_SEX, ENLIST_DATE, DATE_ADDED, PX_MOBILE_NO FROM `tsekap_tbl_enlist` ORDER BY `tsekap_tbl_enlist`.`TRANS_DATE` DESC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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

app.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
