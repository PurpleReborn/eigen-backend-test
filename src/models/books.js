const db = require("../config/db");
const { promisify } = require("util");

const execPromise = promisify(db.query).bind(db);

const table = 'book'

exports.modelAllBooks = () => {
  return execPromise(`SELECT * FROM ${table}`);
};

exports.modelCreateBook = (data) => {
  return execPromise(
    `
      INSERT INTO ${table} (code, title, author, stock)
      VALUES (?,?,?,?)
    `,
    [data.code, data.title, data.author, data.stock]
  );
};