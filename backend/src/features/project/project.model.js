const { DataTypes } = require("sequelize");
const {sequelize} = require("../../config/db.js");

const Project = sequelize.define(
  "Project",

  {
    // PROJECT ID
    id: {
      type: DataTypes.UUID,

      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },

    // PROJECT NAME
    title: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    // PROJECT DESCRIPTION
    description: {
      type: DataTypes.TEXT,

      allowNull: false,
    },

    // DEADLINE
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // PROJECT STATUS
    status: {
      type: DataTypes.ENUM(
        "not_started",
        "in_progress",
        "completed"
      ),

      defaultValue: "not_started",
    },

    // SOLO OR TEAM             
    projectType: {
      type: DataTypes.ENUM(
        "solo",
        "team",
      ),

      allowNull: false,
    },

  // SOLO PROJECT OWNER
 traineeId: {
  type: DataTypes.UUID,
  allowNull: true,  // null when it's a team project
    },

// TEAM PROJECT OWNER
  teamId: {
  type: DataTypes.UUID,
  allowNull: true,  // null when it's a solo project
},
  },
);


module.exports =  Project ;     