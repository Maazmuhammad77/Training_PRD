const express = require("express");
const router = express.Router();
const requireRole = require("../../middlewares/role.js");
const authMiddleware = require("../../middlewares/auth.js");
const managerController = require("./manager.controller.js")

router.post("/manager/login", authMiddleware, requireRole("manager"), managerController.login);


module.exports = router ;