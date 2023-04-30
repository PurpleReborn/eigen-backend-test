const db = require("../config/db");
const { promisify } = require("util");

const execPromise = promisify(db.query).bind(db);

const table = "member";

exports.modelAllMembers = () => {
  return execPromise(
    `
      SELECT member.code, member.name, member.status, member.active_date, 
        COUNT(CASE WHEN transaction.status = 'active' 
        THEN transaction.id ELSE NULL END) AS borrowed_count 
      FROM ${table}
      LEFT JOIN transaction ON member.code = transaction.member_code
      GROUP BY member.code, member.name
    `
  );
};

exports.modelCreateMember = (data) => {
  return execPromise(
    `
      INSERT INTO ${table} (code, name)
      VALUES (?,?)
    `,
    [data.code, data.name]
  );
};

exports.modelPenaltyMember = (id, active_date) => {
  return execPromise(
    `
      UPDATE ${table} SET 
        active_date = ?
      WHERE code = ?
    `,
    [active_date, id]
  );
};

exports.modelDetailMember = (code) => {
  return execPromise(
    `
      SELECT * FROM ${table} WHERE code IN (?)`,
    [code]
  );
};
