const {createManager,createNotee, getNotesForTrainee, getNotesByManager ,deleteNotee} = require("./managernote.service.js")

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const manager = await createManager({ fullName, email, password });
    res.status(201).json({ success: true, data: manager });
  } catch (error) {
    // Handle known errors (validation, duplicate email)
    if (error.message === 'fullName, email, and password are required' ||
        error.message === 'Email already in use') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createNote = async (req, res) => {
  try {
    const managerId = req.managerId;  // set by auth middleware
    const { trainee_id, note } = req.body;
    const newNote = await managerNoteService.createNotee(managerId, trainee_id, note);
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.error('Create note error:', error);
    if (error.message.includes('required') ||
        error.message.includes('not found')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getTraineeNotes = async (req, res) => {
  try {
    const { traineeId } = req.params;
    const notes = await getNotesForTrainee(traineeId);
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error('Get trainee notes error:', error);
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// GET /managers/:managerId/notes (or /my-notes if you prefer current manager)
const getManagerNotes = async (req, res) => {
  try {
    const { managerId } = req.params; // or req.managerId for own notes
    const notes = await getNotesByManager(managerId);
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.error('Get manager notes error:', error);
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// DELETE /notes/:id
const deleteNote = async (req, res) => {
  try {
    const managerId = req.managerId; // from auth
    const { id } = req.params;
    await deleteNotee(id, managerId);
    res.status(200).json({ success: true, message: 'Note deleted' });
  } catch (error) {
    console.error('Delete note error:', error);
    if (error.message.includes('not found') ||
        error.message.includes('only delete your own')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { register, deleteNote}