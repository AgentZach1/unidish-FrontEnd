require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 3305;

const app = express();

const corsOptions = {
    origin: ['https://connect.weiss.land', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}

// Enable CORS
app.use(cors(corsOptions));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    console.log('User: ' + process.env.DB_USER);
  });

// Define the endpoint
app.get('/api/unidish', (req, res) => {
    console.log("Received get");
    const { table } = req.query;
    let query = '';
    query = 'SELECT * FROM ' + table + ';';

    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
    