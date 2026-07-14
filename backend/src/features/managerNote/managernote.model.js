const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db.js");

const ManagerNote = sequelize.define("ManagerNote", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  trainee_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = ManagerNote;