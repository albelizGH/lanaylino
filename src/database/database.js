const mysql = require('mysql2/promise');


import config from "./../config";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});


const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}
