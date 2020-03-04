const express = require('express');
const mysql = require('mysql');
const request = require('request');

const PORT = 5000;
const HOST = '0.0.0.0';

const app = express();

let pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
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

app.get('/email', (req, res) => {
    request(`http://${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}/?email=rosudavidg@gmail.com&token=hi`, { json: false }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
    });

    res.send('succes');
});


app.listen(PORT, HOST);
