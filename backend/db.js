"use strict";
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: getDatabaseUri(),
  // user: "postgres",  // or the user you want to use
  // password: "YOUR_PASSWORD_HERE"  // replace with your postgres user's password
};

const db = new Client(process.env.NODE_ENV === "production" ? {
  connectionString: getDatabaseUri(),
  ssl: {
    rejectUnauthorized: false
  }
} : dbConfig);

async function testDbConnection() {
  try {
    console.log("Attempting to connect to the database...");
    const result = await db.query(`SELECT NOW();`);
    console.log("Current Time:", result.rows[0]);
  } catch (error) {
    console.error("Error testing database connection:", error);
  }
}

db.connect().then(testDbConnection);

module.exports = db;
