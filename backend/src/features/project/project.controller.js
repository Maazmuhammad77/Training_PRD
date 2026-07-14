const {
  createProject,
  getAllProjects,
  getTraineeProjects,
  updateProjectStatus,
} = require("./project.service");

const create = async (req, res) => {

  try {
    const { title , description,teamId, traineeId, dueDate, projectType } = req.body;
    const project = await createProject({ title, description, traineeId, teamId, dueDate, projectType });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PROJECTS
const getAll = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET TRAINEE PROJECTS
const getByTrainee = async (req, res) => {
  try {
    const projects = await getTraineeProjects(req.params.traineeId);

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE STATUS
const updateStatus = async (req, res) => {
  try {
    const project = await updateProjectStatus(req.params.id, req.body.status);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getByTrainee,
  updateStatus,
};
