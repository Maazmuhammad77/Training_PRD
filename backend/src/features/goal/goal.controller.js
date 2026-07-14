const {
  createGoal: createGoalService,
  getGoals: getGoalService,
  updateGoal: updateGoalService,
  deleteGoal: deleteGoalService,
} = require("./goal.service");

// CREATE GOAL
const createGoal = async (req, res) => {
  try {
    const { traineeId, title, dueDate } = req.body;

    const goal = await createGoalService({
      traineeId,
      title,
      dueDate,
    });

    res.status(201).json({
      success: true,
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET GOALS OF A TRAINEE
const getGoals = async (req, res) => {
  try {
    const { traineeId } = req.params;
    const goals = await getGoalService(traineeId);

    res.status(200).json({
      success: true,
      goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE GOAL STATUS
const updateGoal = async (req, res) => {
  try {
    const { status } = req.body;
    const { goalId } = req.params;
    const goal = await updateGoalService(goalId, status);

    res.status(200).json({
      success: true,
      goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE GOAL
const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const goal = await deleteGoalService(goalId);

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
};
