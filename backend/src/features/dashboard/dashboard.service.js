const{Trainee, Goal , Project, Team } = require ("../../models/index.js")

const inDangerTrainees = async (req, res) => {
  const danger = [];
  const overdueGoals = await Goal.findAll({
    where: {
      status: "OVERDUE",
    },
  });

  for (let goal of overdueGoals) {
    const traineeProfile = await Trainee.findByPk(goal.traineeId);

    danger.push({
      traineeId: goal.traineeId,
      fullName: traineeProfile.fullName,
      reason: "Overdue Goal",
    });
  }

  const overdueProjects = await Project.findAll({
    where: {},
  });

  for (let project of overdueProjects) {
    if (project.dueDate < new Date() && project.status !== "completed") {
      if (project.projectType === "solo") {
        const trainee = await Trainee.findByPk(project.traineeId);
        danger.push({
          traineeId: project.traineeId,
          fullName: trainee.fullName,
          reason: "Overdue Project",
        });
      } else {
        const team = await Team.findByPk(project.teamId);
        danger.push({
          teamId: project.teamId,
          fullName: team.name,
          reason: "Overdue Project",
        });
      }
    }
  }
  
  return res.status(201).json(danger);
};

const activeTrainees = async (req, res) => {
  try {
  const trainees = await Trainee.findAll();
  console.log(trainees);
  res.status(200).json(trainees);
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { inDangerTrainees, activeTrainees };
