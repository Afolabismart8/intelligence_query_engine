require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on("error", (err) => {
  console.error("Unexpected database connection error:", err);
  process.exit(1);
});

pool.connect()
  .then(() => console.log("CONNECTED SUCCESSFULLY ✅"))
  .catch((err) => {
    console.error("CONNECTION FAILED ❌", err);
    process.exit(1);
  });

module.exports = pool;