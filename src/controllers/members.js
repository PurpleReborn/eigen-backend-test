const { response } = require("../helpers/response");
const { modelAllMembers, modelCreateMember } = require("../models/members");
const _ = require("lodash");

const getAllMembers = async (req, res) => {
  try {
    const result = await modelAllMembers()
    if (result.length > 0) {
      return response(res, 200, result, "All Members");
    }
    return response(res, 200, true, "Empty Members");
  } catch {
    return response(res, 400, false, "Data error");
  }
};

const createMember = async (req, res) => {
  const data = req.body;
  if (
    _.isEmpty(data.code) ||
    _.isEmpty(data.name)
  ) {
    return response(res, 400, false, "Data tidak boleh kosong");
  }

  try {
    const post = await modelCreateMember(data);
    if (post) {
      return response(res, 200, true, "Success Create Member");
    }
  } catch (err) {
    return response(res, 400, false, "Failed Create Member");
  }
};

module.exports = {
  getAllMembers,
  createMember,
};
