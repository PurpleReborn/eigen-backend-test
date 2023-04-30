const { response } = require("../helpers/response");
const { modelAllBooks, modelCreateBook } = require("../models/books");
const _ = require("lodash");

const getAllBooks = async (req, res) => {
  try { 
    const result = await modelAllBooks();
    if (!_.isEmpty(result)) {
      return response(res, 200, result, "All Books");
    }
    return response(res, 200, true, "Empty Books");
  } catch {
    return response(res, 400, false, "Data error");
  }
};

const createBook = async (req, res) => {
  const data = req.body;
  if (
    _.isEmpty(data.code) ||
    _.isEmpty(data.title) ||
    _.isEmpty(data.author) ||
    data.stock < 1
  ) {
    return response(res, 400, false, "Data tidak boleh kosong");
  }

  try {
    const post = await modelCreateBook(data);
    if(post){
      return response(res, 200, true, "Success Create Book");
    }
  } catch (err) {
    return response(res, 400, false, "Failed Create Book");
  }
};

module.exports = {
  getAllBooks,
  createBook,
};
