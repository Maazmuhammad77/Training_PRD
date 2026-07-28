const { DataTypes } = require("sequelize");
const {sequelize}= require("../config/db.js");

const Goal = sequelize.define(
  "Goal",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    traineeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "NOT_STARTED",
        "IN_PROGRESS",
        "DONE",
        "OVERDUE"
      ),
      defaultValue: "NOT_STARTED",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Goal;