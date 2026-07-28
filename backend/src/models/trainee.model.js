const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Trainee = sequelize.define(
  "Trainee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    background: {
      type: DataTypes.TEXT,
    },

    track: {
      type: DataTypes.STRING,
      defaultValue: "Web Development",
    },

    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "ACTIVE",
    },

    inviteId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Trainee;