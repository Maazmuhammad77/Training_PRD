const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Announcement = sequelize.define("Announcement", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  body:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  posted_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  posted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});


module.exports = Announcement;