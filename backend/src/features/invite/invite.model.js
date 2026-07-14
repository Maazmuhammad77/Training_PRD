const { DataTypes } = require("sequelize");
const {sequelize} = require("../../config/db.js");

const Invite = sequelize.define(
  "Invite",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },

    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    invitedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    acceptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "expired"
      ),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Invite;