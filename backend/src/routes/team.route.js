const express = require("express");
const requireRole = require("../middlewares/role.js");
const authMiddleware = require("../middlewares/auth.js");
const router = express.Router();
const teamController  = require("../controllers/team.controller.js");

router.post ("/teams",requireRole("manager"), teamController.createTeams);
router.post ("/teams/:teamId/addmember",requireRole("manager"), teamController.addMembers);
router.delete ("/teams/:teamId/removemember/:traineeId",requireRole("manager"), teamController.removeMembers);
router.get ("/teams/:teamId/timeline",requireRole("manager"), teamController.getTimelines);

module.exports = router;