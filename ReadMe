# Intelligence Query Engine

A backend API that converts natural language queries into structured database filters to retrieve user profile data stored in a PostgreSQL database.

This system powers intelligent querying for demographic data, allowing users to search using simple human language like:
"young male nigeria", "adult female kenya", etc.

---

## Features

- Natural language query parsing
- Dynamic SQL query builder
- PostgreSQL data persistence
- Advanced filtering (gender, age, country)
- Pagination support
- Sorting support
- RESTful API design
- Duplicate-safe data seeding

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)
- dotenv

---

## Project Structure

Intelligence Query Engine/
├── configs/
│   └── database.js
├── controllers/
│   └── profileController.js
├── services/
│   ├── profileServices.js
│   └── queryparserServices.js
├── utility/
│   └── queryBuilder.js
├── routes/
│   └── profileRoutes.js
├── seeds/
│   ├── seed.js
│   └── seed_profile.json
├── app.js
├── .env
└── package.json

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

PORT=8080

DB_USER=postgres  
DB_HOST=localhost  
DB_NAME=intelligence-query-engine-DB  
DB_PASSWORD=your_password  
DB_PORT=5432  

---

## Installation & Setup

1.  
cd Intelligence Query Engine  

2. Install dependencies  
npm install  

3. Setup PostgreSQL database  
CREATE DATABASE intelligence-query-engine-DB;

4. Ensure PostgreSQL is running on port 5432

5. Seed the database  
node seeds/seed.js  

Expected output:  
Seeding started...  
CONNECTED SUCCESSFULLY ✅  
Seeding completed successfully 🚀  

6. Run the server  
npm run dev  

Server runs on:  
http://localhost:8080  

---

##  API Endpoints

### GET /profiles  
Returns all profiles with pagination and sorting support.

Query Params:
- page (default: 1)
- limit (default: 10)
- sort_by (age | created_at | gender_probability)
- order (asc | desc)

Example:  
GET /profiles?page=1&limit=10  

---

### GET /profiles/search?q=...

Search profiles using natural language queries.

Example:  
GET /profiles/search?q=young male nigeria  

Supported expressions:
- young
- adult
- senior
- male / female
- country names (Nigeria, Kenya, etc.)
- age filters (above 30, below 20)

---

## Query Processing Flow

User Input → Controller → parseQuery → buildQuery → PostgreSQL → Response

Example:

"young male nigeria"

Becomes:

{
  gender: "male",
  min_age: 16,
  max_age: 24,
  country_id: "NG"
}

---

## 🗄️ Database Layer

- PostgreSQL used for data storage
- pg Pool manages connections
- Parameterized queries prevent SQL injection
- Efficient filtering and indexing support

---

## 🔁 Data Seeding

- Loads data from seed_profile.json
- Inserts profiles into PostgreSQL
- Safe re-run (prevents duplicate records)

Run:
node seeds/seed.js

---

## Testing

Test using Postman:

GET https://afolabiyusufolalekan-6325302.postman.co/workspace/Afolabi-Yusuf-olalekan's-Worksp~affa0d59-2198-4d53-863a-c3475a6f6ade/request/52037553-84a8a8d0-7f85-4391-879e-6193e83de3f6?action=share&source=copy-link&creator=52037553&ctx=documentation


GET https://afolabiyusufolalekan-6325302.postman.co/workspace/Afolabi-Yusuf-olalekan's-Worksp~affa0d59-2198-4d53-863a-c3475a6f6ade/request/52037553-84a8a8d0-7f85-4391-879e-6193e83de3f6?action=share&source=copy-link&creator=52037553&ctx=documentation

---

## Common Issues

ECONNREFUSED  
→ Ensure PostgreSQL is running on port 5432  

parseQuery is not a function  
→ Fix import:
const { parseQuery } = require("../services/queryparserServices");

---

##  Author

Yusuf Afolabi  

---

## License

This project is built for educational and assessment purposes (HNG Internship).