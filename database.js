const mysql = require('mysql');

// Creates the connection variable and exports it to be used in other .js files
const connection = module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',
    password: 'root',
    database: 'car_rental'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected...');
});