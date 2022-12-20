const mysql = require("mysql2");

const connection = new mysql.createConnection(
    {
        host: "localhost",
        databse: 'company_db',
        user: 'root',
        password:'',
    },
    console.log(`Connected to the employee database`)
);

connection.connect((err) => {
    if (err) {
        throw err;
    };
});

module.exports = connection;
