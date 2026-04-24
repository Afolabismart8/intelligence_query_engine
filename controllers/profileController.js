const { getProfilesService } = require("../services/profileServices.js");
const {parseQuery} = require("../services/queryparserServices.js");

exports.getProfiles = async (req, res) => {
  try {
    const result = await getProfilesService(req.query);

    const totalPages = Math.ceil(result.total / result.limit);
    const from = (result.page - 1) * result.limit + 1;
    const to = Math.min(result.page * result.limit, result.total);

    return res.json({
      status: "success",
      data: result.data,
      pagination: {
        current_page: result.page,
        per_page: result.limit,
        total: result.total,
        total_pages: totalPages,
        from: result.data.length > 0 ? from : null,
        to: result.data.length > 0 ? to : null,
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.searchProfiles = async (req, res) => {
  try {
    if (!req.query.q) {
      return res.status(400).json({
        status: "error",
        message: "Missing query parameter",
      });
    }

    const filters = parseQuery(req.query.q);

    const result = await getProfilesService({
      ...filters,
      page: req.query.page,
      limit: req.query.limit,
    });

    const totalPages = Math.ceil(result.total / result.limit);
    const from = (result.page - 1) * result.limit + 1;
    const to = Math.min(result.page * result.limit, result.total);

    return res.json({
      status: "success",
      data: result.data,
      pagination: {
        current_page: result.page,
        per_page: result.limit,
        total: result.total,
        total_pages: totalPages,
        from: result.data.length > 0 ? from : null,
        to: result.data.length > 0 ? to : null,
      }
    });
  } catch (err) {
    return res.status(422).json({
      status: "error",
      message: err.message,
    });
  }
};