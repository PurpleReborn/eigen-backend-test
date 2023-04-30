const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.get("/", booksController.getAllBooks);
router.post("/", booksController.createBook);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for Books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get All Books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success Get All Books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create Book
 *     tags: [Books]
 *     requestBody:
 *       description: Book data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success Create Book
 *       400:
 *         description: Failed Create Book
 */

module.exports = router;
