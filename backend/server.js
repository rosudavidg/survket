const express = require('express');
const mysql = require('mysql');

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

let pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: 3306,
    user: "root",
    password: "supersecret",
    database: "survket_db"
});

app.get('/', (req, res) => {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM users", function (err, rows) {
            connection.release();
            if (err) throw err;

            console.log(rows.length);
            res.send(JSON.stringify(rows));
        });
    });
});

// app.use(bodyParser.json())

app.listen(PORT, HOST);
