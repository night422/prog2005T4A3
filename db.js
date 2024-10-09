const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',  // Your MySQL server hostname
    user: 'root',       // Your MySQL username
    password: 'h9g7q3576',  // Your MySQL password
    database: 'user_management',  // Your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = db.promise(); 