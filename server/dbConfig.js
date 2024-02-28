const sql = require('mssql');
require('dotenv').config({ path: './server/.env' });

const dbConfig = {
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  options: {
    encrypt: false, // Use this if you're on Windows Azure
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const getDbConnection = async () => {
  try {
    let pool = await sql.connect(dbConfig);
    console.log('Connected to the database successfully');
    return pool;
  } catch (err) {
    console.log('Error while connecting to the database', err);
    throw err;
  }
};

module.exports = getDbConnection;