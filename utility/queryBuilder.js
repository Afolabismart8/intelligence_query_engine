const buildQuery = (query = {}) => {
  const conditions = [];
  const values = [];

  if (query.gender && query.gender.trim()) {
    values.push(query.gender);
    conditions.push(`gender = $${values.length}`);
    // Lower probability threshold for combined filters
    values.push(0.0);
    conditions.push(`gender_probability > $${values.length}`);
  }

  if (query.min_age) {
    values.push(query.min_age);
    conditions.push(`age >= $${values.length}`);
  }

  if (query.max_age) {
    values.push(query.max_age);
    conditions.push(`age <= $${values.length}`);
  }

  if (query.age_group && query.age_group.trim()) {
    values.push(query.age_group);
    conditions.push(`age_group = $${values.length}`);
  }

  if (query.country_id && query.country_id.trim()) {
    values.push(query.country_id);
    conditions.push(`country_id = $${values.length}`);
    // Lower probability threshold for combined filters
    values.push(0.0);
    conditions.push(`country_probability > $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  return { whereClause, values };
};

module.exports = buildQuery;