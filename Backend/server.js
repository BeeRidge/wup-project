const express = require('express');
const mysql = require('mysql') // database
const cors = require('cors') //cross-origin requests

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'konsulta'
})

app.get('/', (req, res) => {
    return res.json("From Backend Side");
})

app.get('/api/users', (req,res) => {
    const sql = "SELECT * FROM `tsekap_tbl_hci_profile`";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("http://localhost:8081");
})