const {
  createGoal: createGoalService,
  getGoals: getGoalService,
  updateGoal: updateGoalService,
  deleteGoal: deleteGoalService,
} = require("../services/goal.service");
const asyncHandler = require("../utils/asyncHandler.js");
const HTTP_STATUSES = require("../utils/httpStatuses.js");

const createGoal = asyncHandler(async (req, res) => {
  const { traineeId, title, dueDate } = req.body;

  const goal = await createGoalService({
    traineeId,
    title,
    dueDate,
  });

  res.status(HTTP_STATUSES.CREATED).json({
    success: true,
    goal,
  });
});

// GET GOALS OF A TRAINEE
const getGoals = asyncHandler(async (req, res) => {
  const { traineeId } = req.params;

  const goals = await getGoalService(traineeId);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    goals,
  });
});

// UPDATE GOAL STATUS
const updateGoal = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { goalId } = req.params;

  const goal = await updateGoalService(goalId, status);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    goal,
  });
});

// DELETE GOAL
const deleteGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  await deleteGoalService(goalId);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    message: "Goal deleted successfully",
  });
});

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
