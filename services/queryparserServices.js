const countryMap = {
  nigeria: "NG",
  kenya: "KE",
  angola: "AO",
  benin: "BJ",
};

exports.parseQuery = (q) => {
  if (!q || typeof q !== "string") {
    throw new Error("Invalid query parameters");
  }

  const query = q.toLowerCase();
  const filters = {};

  // gender (FIXED)
  if (query.includes("female")) {
    filters.gender = "female";
  } else if (query.includes("male")) {
    filters.gender = "male";
  }

  // age keywords
  if (query.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  if (query.includes("adult")) filters.age_group = "adult";
  if (query.includes("teenager")) filters.age_group = "teenager";
  if (query.includes("child")) filters.age_group = "child";
  if (query.includes("senior")) filters.age_group = "senior";

  // numeric age filters
  const aboveMatch = query.match(/above (\d+)/);
  if (aboveMatch) filters.min_age = parseInt(aboveMatch[1]);

  const belowMatch = query.match(/below (\d+)/);
  if (belowMatch) filters.max_age = parseInt(belowMatch[1]);

  // country mapping
  for (const country of Object.keys(countryMap)) {
    if (query.includes(country)) {
      filters.country_id = countryMap[country];
      break;
    }
  }

  // validation
  if (Object.keys(filters).length === 0) {
    throw new Error("Unable to interpret query");
  }

  return filters;
};