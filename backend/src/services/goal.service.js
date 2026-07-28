const Goal = require("../models/goal.model.js");
const ApiError = require("../utils/ApiError.js");
// create a new goal
const createGoal = async ({ title, dueDate, traineeId,teamId})=>{
    const goal = await Goal.create({
        title,
        dueDate,
        traineeId,
        teamId
    })
    return goal;
}

// get goals for a trainee
const getGoals = async (traineeId)=>{ 
    const goals = await Goal.findAll({ where : { traineeId } , order : [['createdAt', 'DESC']]});

    for (let goal of goals){
        if( new Date() > goal.dueDate && goal.status !== "DONE")
        {
            goal.status = "OVERDUE";
            await goal.save();
        }
    }
    return goals;
}

// update goal status
const updateGoal = async (goalId, status) => {
    const goal = await Goal.findByPk(goalId);

    if(!goal){
        throw new Error("Goal not found");
    }
    goal.status = status;
    await goal.save();
    return goal;
}

// delete a goal
const deleteGoal = async (goalId) => {
    const goal = await Goal.findByPk(goalId);   
    if (!goal) {
        throw new Error("Goal not found");
    }
    await goal.destroy();
}

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal
}