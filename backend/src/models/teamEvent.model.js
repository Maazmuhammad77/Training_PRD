const { DataTypes } = require("sequelize");
const  { sequelize } = require("../config/db");

const TeamEvent = sequelize.define(
  "TeamEvent",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    team_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    event_type: {
      type: DataTypes.ENUM(
        "member_joined",
        "member_left",
        "project_assigned",
        "project_status_changed",
        "project_removed"
      ),
      allowNull: false,
    },

    reference_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = TeamEvent;