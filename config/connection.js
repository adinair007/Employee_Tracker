require("dotenv").config();
const mysql = require("mysql2");

const connection = new mysql.createConnection(
    {
        host: "localhost",
        databse: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    console.log(`Connected to the database`)
);

module.exports = connection;
