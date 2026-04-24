const fs = require("fs");
const path = require("path");
const pool = require("../configs/database");

// Load JSON file
const filePath = path.join(__dirname, "seed_profile.json");

// Parse JSON and extract profiles array
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
const profiles = data.profiles;

const seedDatabase = async () => {
  try {
    console.log("Seeding started...");

    // Create profiles table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        gender TEXT,
        gender_probability REAL,
        age INTEGER,
        age_group TEXT,
        country_id TEXT,
        country_name TEXT,
        country_probability REAL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      )
    `);

    // Create unique index on name for conflict resolution
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS profiles_name_key ON profiles (name)
    `);

    console.log("Table setup complete...");

    for (let user of profiles) {
      await pool.query(
        `
        INSERT INTO profiles (
          name,
          gender,
          gender_probability,
          age,
          age_group,
          country_id,
          country_name,
          country_probability,
          created_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
        ON CONFLICT (name) DO NOTHING
        `,
        [
          user.name,
          user.gender,
          user.gender_probability,
          user.age,
          user.age_group,
          user.country_id,
          user.country_name,
          user.country_probability,
        ]
      );
    }

    console.log("Seeding completed successfully 🚀");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDatabase();