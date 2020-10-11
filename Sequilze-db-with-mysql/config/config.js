require('dotenv').config();
const mysql2 = require('mysql2');
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectModule" : mysql2 
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "db1",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "db1",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
