const db = require("../config/db");
const { promisify } = require("util");

const execPromise = promisify(db.query).bind(db);

const table = "transaction";

exports.modelAllTransactions = () => {
  return execPromise(
    `
      SELECT transaction.id, transaction.book_code, transaction.member_code, transaction.borrow_date, 
        transaction.return_date, transaction.status, 
        book.code, book.title, book.author, book.stock,
        member.code, member.name
      FROM ${table}
      LEFT JOIN book ON transaction.book_code = book.code
      LEFT JOIN member ON transaction.member_code = member.code
    `
  );
};

exports.modelDetailTransactions = (id) => {
  return execPromise(
    `
      SELECT * FROM ${table} WHERE id IN (?)`,
    [id]
  );
};

exports.modelCountDetailTransactions = (id) => {
  return execPromise(
    `
      SELECT COUNT(*) as count FROM ${table} WHERE id IN (?)`,
    [id]
  );
};

exports.modelCreateTransactions = (data) => {
  return execPromise(
    `
      INSERT INTO ${table} (book_code, member_code, borrow_date, return_date, status)
      VALUES (?,?,?,?,?)
    `,
    [
      data.book_code,
      data.member_code,
      data.borrow_date,
      data.return_date,
      data.status,
    ]
  );
};

exports.modelReturnTransactions = (id, data) => {
  return execPromise(
    `
      UPDATE ${table} SET 
        return_date = ?, status = ? 
      WHERE id = ?
    `,
    [data.return_date, data.status, id]
  );
};

exports.modelTrxActiveCount = (query) => {
  return execPromise(
    `
      SELECT COUNT (transaction.id) AS count FROM ${table} 
      WHERE status = 'active' AND member_code = ?
    `,
    [query.member_code]
  );
};

exports.modelFindBookActive = (query) => {
  return execPromise(
    `
      SELECT COUNT (transaction.id) AS count FROM ${table} 
      WHERE status = 'active' AND book_code = ?
    `,
    [query.book_code]
  );
};
