const pool = require("../configs/database.js");
const buildQuery = require("../utility/queryBuilder.js");

const getProfilesService = async (query) => {
  try {
    const { whereClause, values } = buildQuery(query || {});

    const validSortFields = ["age", "created_at", "gender_probability"];
    const sortBy = validSortFields.includes(query.sort_by)
      ? query.sort_by
      : "created_at";

    const order = query.order === "asc" ? "ASC" : "DESC";

    const limit = Math.min(parseInt(query.limit) || 10, 50);
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;

    const dataQuery = `
      SELECT * FROM profiles
      ${whereClause}
      ORDER BY ${sortBy} ${order}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    const countQuery = `
      SELECT COUNT(*) FROM profiles
      ${whereClause}
    `;

    const dataResult = await pool.query(dataQuery, [
      ...values,
      limit,
      offset,
    ]);

    const countResult = await pool.query(countQuery, values);

    return {
      data: dataResult.rows,
      total: parseInt(countResult.rows[0].count),
      page,
      limit,
    };
  } catch (err) {
    throw new Error(`Service error: ${err.message}`);
  }
};

module.exports = { getProfilesService };