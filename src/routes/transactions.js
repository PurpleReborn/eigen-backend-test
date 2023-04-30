const express = require("express");
const router = express.Router();

const transactionsController = require("../controllers/transactions");

router.get("/", transactionsController.getAllTransactions);
router.post("/", transactionsController.createTransactions);
router.put("/return/:id", transactionsController.returnTransactions);

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for Transactions
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get All Transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Success Get All Transactions
 */


/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create Transactions
 *     tags: [Transactions]
 *     requestBody:
 *       description: Transactions data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_code:
 *                 type: string
 *               member_code:
 *                 type: string
 *               borrow_date:
 *                 type: string
 *               return_date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success Create Transactions
 *       400:
 *         description: Failed Create Transactions
 */

/**
 * @swagger
 * /transactions/return/{id}:
 *   put:
 *     summary: Update Transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the transaction to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Transactions data to Update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               return_date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success Update Transactions
 *       400:
 *         description: Failed Update Transactions
 */

module.exports = router;
