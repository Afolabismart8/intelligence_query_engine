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