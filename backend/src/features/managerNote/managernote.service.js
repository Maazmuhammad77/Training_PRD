const {Manager } = require("../../models/index.js")
const bcrypt = require('bcryptjs');

const createManager = async ({ fullName, email, password }) => {
  // Validate required fields
  if (!fullName || !email || !password) {
    throw new Error('fullName, email, and password are required');
  }

  // Check if email already exists
  const existing = await Manager.findOne({ where: { email } });
  if (existing) {
    throw new Error('Email already in use');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password,10);

  // Create manager (role defaults to "manager")
  const manager = await Manager.create({
    fullName,
    email,
    passwordHash,
  });

  // Return manager data without sensitive field
  const { passwordHash: _, ...managerData } = manager.toJSON();
  return managerData;
};



const createNotee = async (managerId, traineeId, noteText) => {
  if (!managerId || !traineeId || !noteText) {
    throw new Error('managerId, traineeId, and note are required');
  }

  // Optional: verify manager and trainee exist
  const manager = await Manager.findByPk(managerId);
  if (!manager) throw new Error('Manager not found');

  const trainee = await Trainee.findByPk(traineeId);
  if (!trainee) throw new Error('Trainee not found');

  const note = await ManagerNote.create({
    manager_id: managerId,
    trainee_id: traineeId,
    note: noteText,
  });

  return note;
};


const getNotesForTrainee = async (traineeId) => {
  const trainee = await Trainee.findByPk(traineeId);
  if (!trainee) throw new Error('Trainee not found');

  const notes = await ManagerNote.findAll({
    where: { trainee_id: traineeId },
    include: [
      { model: Manager, as: 'manager', attributes: ['id', 'fullName', 'email'] },
    ],
    order: [['created_at', 'DESC']],
  });

  return notes;
}; 

const getNotesByManager = async (managerId) => {
  const manager = await Manager.findByPk(managerId);
  if (!manager) throw new Error('Manager not found');

  const notes = await ManagerNote.findAll({
    where: { manager_id: managerId },
    include: [
      { model: Trainee, as: 'trainee', attributes: ['id', 'fullName', 'email'] }, // adjust fields
    ],
    order: [['created_at', 'DESC']],
  });

  return notes;
};

const deleteNotee = async (noteId, managerId) => {
  const note = await ManagerNote.findByPk(noteId);
  if (!note) throw new Error('Note not found');

  if (note.manager_id !== managerId) {
    throw new Error('You can only delete your own notes');
  }

  await note.destroy();
  return true;
};

module.exports ={createManager , createNotee, getNotesForTrainee, getNotesByManager, deleteNotee}