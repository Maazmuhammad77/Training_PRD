const express = require("express");
const requireRole = require("../middlewares/role.js");
const authMiddleware = require("../middlewares/auth.js");
const router = express.Router();

const goalController = require("../controllers/goal.controller.js");


// CREATE GOAL
router.post("/goal", authMiddleware, requireRole("manager"), goalController.createGoal);

// GET TRAINEE GOALS
router.get("/goal/:traineeId", authMiddleware, goalController.getGoals);

// UPDATE STATUS
router.patch("/goal/:goalId", authMiddleware, requireRole("manager"), goalController.updateGoal);

// DELETE GOAL
router.delete("/goal/:goalId", authMiddleware, requireRole("manager"), goalController.deleteGoal);

module.exports = router;