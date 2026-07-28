const express = require("express");
const traineeController = require("../controllers/trainee.controller.js");
const requireRole = require("../middlewares/role.js");
const authMiddleware = require("../middlewares/auth.js");
const router = express.Router();

router.get(
  "/trainees",requireRole("manager"), 
  traineeController.getAll
);

router.post(
  "/trainee/login",
  authMiddleware,
  traineeController.traineeLogin
);
router.patch("/trainee/:id", authMiddleware,
  requireRole("manager"),
  traineeController.update
);

router.get("/trainees/pending", authMiddleware, requireRole("manager"), traineeController.pending);


module.exports = router ;