const buildQuery = (query = {}) => {
  const conditions = [];
  const values = [];

  if (query.gender && query.gender.trim()) {
    values.push(query.gender);
    conditions.push(`gender = $${values.length}`);
  }

  if (query.min_age) {
    values.push(query.min_age);
    conditions.push(`age >= $${values.length}`);
  }

  if (query.max_age) {
    values.push(query.max_age);
    conditions.push(`age <= $${values.length}`);
  }

  if (query.country_id && query.country_id.trim()) {
    values.push(query.country_id);
    conditions.push(`country_id = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  return { whereClause, values };
};

module.exports = buildQuery;