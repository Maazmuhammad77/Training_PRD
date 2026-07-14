const express = require("express");
const router = express.Router();
const requireRole = require("../../middlewares/role.js");
const authMiddleware = require("../../middlewares/auth.js");
const managerController = require("./managernote.controller.js")

router.post("/manager/create", authMiddleware, requireRole("manager"), managerController.createNote);


module.exports = router ;