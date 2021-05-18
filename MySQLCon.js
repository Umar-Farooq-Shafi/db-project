const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 1000,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbms_proj2',
  multipleStatements: true,
  supportBigNumbers: true,
});

module.exports = pool;
