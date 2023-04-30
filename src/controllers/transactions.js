const { response } = require("../helpers/response");
const { modelPenaltyMember, modelDetailMember } = require("../models/members");
const {
  modelAllTransactions,
  modelCreateTransactions,
  modelReturnTransactions,
  modelFindBookActive,
  modelTrxActiveCount,
  modelDetailTransactions,
} = require("../models/transactions");
const _ = require("lodash");
const moment = require("moment");

const getAllTransactions = async (req, res) => {
  try {
    const result = await modelAllTransactions();
    if (result.length > 0) {
      const data = result.map((item) => {
        return {
          id: item.id,
          status: item.status,
          borrow_date: item.borrow_date,
          return_date: item.return_date,
          book: {
            code: item.book_code,
            title: item.title,
            author: item.author,
          },
          member: {
            code: item.member_code,
            name: item.name,
          },
        };
      })
      return response(res, 200, data, "All Transactions");
    }
    return response(res, 200, true, "Empty Transactions");
  } catch {
    return response(res, 400, false, "Data error");
  }
};

const createTransactions = async (req, res) => {
  const data = req.body;
  if (
    _.isEmpty(data.book_code) ||
    _.isEmpty(data.member_code) ||
    _.isEmpty(data.borrow_date) ||
    _.isEmpty(data.status)
  ) {
    return response(res, 400, false, "Data tidak boleh kosong");
  }

  try {
    //#region handle active member
    const today = moment();
    const detailMember = await modelDetailMember(data?.member_code);
    const activeDate = detailMember?.[0]?.active_date;
    const activeDateString = new Date(activeDate)

    const validatePenalty = moment?.(activeDate)?.isAfter?.(today);
    if (validatePenalty) {
      return response(
        res,
        400,
        false,
        `User terkena penalty, coba setelah tanggal: ${activeDateString?.toLocaleDateString()}`
      );
    }

    //#endregion handle active member

    if (detailMember?.length !== 1) {
      return response(res, 400, false, "ID tidak ditemukan");
    }

    //#region get count member active trx
    const getActiveTrx = await modelTrxActiveCount(data);
    const activeCount = getActiveTrx[0].count;
    if (activeCount > 2) {
      return response(
        res,
        400,
        false,
        "Members may not borrow more than 2 books"
      );
    }
    //#endregion get count member active trx

    //#region get count book active
    const getActiveBook = await modelFindBookActive(data);
    const activeBook = getActiveBook[0].count;
    if (activeBook > 0) {
      return response(
        res,
        400,
        false,
        "Borrowed books are not borrowed by other members"
      );
    }
    //#endregion get count book active

    const post = await modelCreateTransactions(data);
    if (post) {
      return response(res, 200, true, "Success Create Transactions");
    }
  } catch (err) {
    return response(res, 400, false, "Failed Create Transactions");
  }
};

const returnTransactions = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!id) {
    return response(res, 400, false, "params ID Transactions tidak boleh kosong");
  }

  if (!data.return_date) {
    return response(res, 400, false, "Return date tidak boleh kosong");
  }

  if (!data.status) {
    return response(res, 400, false, "Status Transactions tidak boleh kosong");
  }

  try {
    const detailTrx = await modelDetailTransactions(id);
    if(detailTrx?.length !== 1){
      return response(
        res,
        400,
        false,
        "ID tidak ditemukan"
      );
    }

    //#region penalty
    const memberCode = detailTrx[0]?.member_code;
    const borrowDate = moment(detailTrx[0]?.borrow_date);
    const returnDate = moment(data?.return_date);
    const daysLate = returnDate?.diff?.(borrowDate, "days") - 7;

    if (daysLate > 0) {
      const activeDate = moment()
        .add(3, "days")
        .format("YYYY-MM-DD HH:mm:ss");
      await modelPenaltyMember(memberCode, activeDate);
    }
    //#endregion penalty

    const post = await modelReturnTransactions(id, data);
    if (post) {
      return response(res, 200, true, "Success Return Transactions");
    }
  } catch (err) {
    console.log(err)
    return response(res, 400, false, "Failed Return Transactions");
  }
};

module.exports = {
  getAllTransactions,
  createTransactions,
  returnTransactions
};
