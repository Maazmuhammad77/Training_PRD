const express = require("express");
const router = express.Router();
const requireRole = require("../middlewares/role.js");
const authMiddleware = require("../middlewares/auth.js");
const { inDangerTrainees , activeTrainees }  = require("../services/dashboard.service.js");

router.get("/dashboard",authMiddleware, requireRole("manager") , inDangerTrainees, activeTrainees )

module.exports = router;