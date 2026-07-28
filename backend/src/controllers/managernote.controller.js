const {
  createManager,
  createNotee,
  getNotesForTrainee,
  getNotesByManager,
  deleteNotee,
} = require("../services/managernote.service.js");
const HTTP_STATUSES = require("../utils/httpStatuses.js");
const asyncHandler = require("../utils/asyncHandler.js");

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const manager = await createManager({
    fullName,
    email,
    password,
  });

  res.status(HTTP_STATUSES.CREATED).json({
    success: true,
    data: manager,
  });
});

const createNote = asyncHandler(async (req, res) => {
  const managerId = req.managerId;
  const { trainee_id, note } = req.body;

  const newNote = await createNotee(
    managerId,
    trainee_id,
    note
  );

  res.status(HTTP_STATUSES.CREATED).json({
    success: true,
    data: newNote,
  });
});

const getTraineeNotes = asyncHandler(async (req, res) => {
  const { traineeId } = req.params;

  const notes = await getNotesForTrainee(traineeId);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    data: notes,
  });
});

const getManagerNotes = asyncHandler(async (req, res) => {
  const { managerId } = req.params;

  const notes = await getNotesByManager(managerId);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    data: notes,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const managerId = req.managerId;
  const { id } = req.params;

  await deleteNotee(id, managerId);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    message: "Note deleted",
  });
});

module.exports = {
  register,
  deleteNote,
  createNote,
  getTraineeNotes,
  getManagerNotes,
};