const { getProfilesService } = require("../services/profileServices.js");
const {parseQuery} = require("../services/queryparserServices.js");

exports.getProfiles = async (req, res) => {
  try {
    const result = await getProfilesService(req.query);

    return res.json({
      status: "success",
      data: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
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

    return res.json({
      status: "success",
      data: result.data,
      page: result.page,
      limit: result.limit,
      total: result.total,
    });
  } catch (err) {
    return res.status(422).json({
      status: "error",
      message: err.message,
    });
  }
};