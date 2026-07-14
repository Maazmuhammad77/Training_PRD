const express = require("express");
const router = express.Router();
const requireRole = require("../../middlewares/role.js");
const authMiddleware = require("../../middlewares/auth.js");
const announcementController = require("./announcement.controller.js");


router.post("/announcement/create", authMiddleware, requireRole("manager"), announcementController.createAnnouncement);
router.get("/announcements/get", authMiddleware, announcementController.getAnnouncement);

module.exports = router;