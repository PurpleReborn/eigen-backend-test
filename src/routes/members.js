const express = require("express");
const router = express.Router();

const membersController = require("../controllers/members");

router.get("/", membersController.getAllMembers);
router.post("/", membersController.createMember);

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for Members
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get All Members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Success Get All Members
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create Member
 *     tags: [Members]
 *     requestBody:
 *       description: Member data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success Create Members
 *       400:
 *         description: Failed Create Members
 */

module.exports = router;
