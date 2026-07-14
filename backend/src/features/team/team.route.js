const express = require("express");
const requireRole = require("../../middlewares/role.js");
const authMiddleware = require("../../middlewares/auth.js");
const router = express.Router();
const { createTeams, addMembers, removeMembers, getTimelines } = require("./team.controller.js");

router.post ("/teams",requireRole("manager"), createTeams);
router.post ("/teams/:teamId/addmember",requireRole("manager"), addMembers);
router.delete ("/teams/:teamId/removemember/:traineeId",requireRole("manager"), removeMembers);
router.get ("/teams/:teamId/timeline",requireRole("manager"), getTimelines);

module.exports = router;