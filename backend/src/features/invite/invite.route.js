const express = require("express");
const requireRole = require("../../middlewares/role.js");
const authMiddleware = require("../../middlewares/auth.js");
const inviteController = require("./invite.controller");

const role = require("../../middlewares/role.js");
const router = express.Router();

router.post(
  "/invite/send",
  authMiddleware,
  requireRole("manager"),
  inviteController.sendInvite
);

router.post(
  "/invite/accept/:token",
  authMiddleware,
  // requireRole("manager"),
  inviteController.acceptInvite
);

module.exports = router;