const express = require("express");
const requireRole = require("../../middlewares/role.js");
const authMiddleware = require("../../middlewares/auth.js");
const router = express.Router();

const projectController = require("./project.controller");

router.post("/project/create",requireRole("manager"), projectController.create);
router.get("/project/Allprojects", requireRole("manager"), projectController.getAll);
router.get("/project/trainee/:traineeId", requireRole("manager"), projectController.getByTrainee);
router.patch("/project/:id/status", requireRole("manager"), projectController.updateStatus);

module.exports = router;