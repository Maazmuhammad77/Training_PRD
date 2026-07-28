const { DataTypes } = require("sequelize");
const { sequelize }  = require("../config/db");

const TeamMember = sequelize.define(
  "TeamMember",
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

    trainee_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    left_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TeamMember;