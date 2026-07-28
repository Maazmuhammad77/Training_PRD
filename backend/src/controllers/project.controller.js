const {
  createProject,
  getAllProjects,
  getTraineeProjects,
  updateProjectStatus,
} = require("../services/project.service");
const HTTP_STATUSES = require("../utils/httpStatuses.js");
const asyncHandler = require("../utils/asyncHandler.js");

const create = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    teamId,
    traineeId,
    dueDate,
    projectType,
  } = req.body;

  const project = await createProject({
    title,
    description,
    traineeId,
    teamId,
    dueDate,
    projectType,
  });

  res.status(HTTP_STATUSES.CREATED).json({
    success: true,
    project,
  });
});

// GET ALL PROJECTS
const getAll = asyncHandler(async (req, res) => {
  const projects = await getAllProjects();

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    projects,
  });
});

// GET TRAINEE PROJECTS
const getByTrainee = asyncHandler(async (req, res) => {
  const projects = await getTraineeProjects(req.params.traineeId);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    projects,
  });
});

// UPDATE STATUS
const updateStatus = asyncHandler(async (req, res) => {
  const project = await updateProjectStatus(
    req.params.id,
    req.body.status
  );

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    project,
  });
});

module.exports = {
  create,
  getAll,
  getByTrainee,
  updateStatus,
};