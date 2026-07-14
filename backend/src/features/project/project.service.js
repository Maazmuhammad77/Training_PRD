const Project = require("./project.model.js");

//kitna content bna rha ha - kitny platform py bna raha ha  - communities ha ky nhi

// create project
const createProject = async ({title, description, traineeId, teamId,dueDate, projectType}) => {
  const project = await Project.create({
    title,
    description,
    traineeId,
    teamId,
    dueDate,
    projectType,
  });
  return project;
 
};

// get all projects
const getAllProjects = async () => {
  return await Project.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// get trainee projects
const getTraineeProjects = async (traineeId) => {
  return await Project.findAll({
    where: {
      traineeId,
    },
  });
};

//update project status
const updateProjectStatus = async (projectId, status) => {
  const project = await Project.findByPk(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  project.status = status;

  await project.save();

  return project;
};

module.exports = {
  createProject,
  getAllProjects,
  getTraineeProjects,
  updateProjectStatus,
};
