const { DataTypes } = require("sequelize");
const {sequelize} = require("../../config/db.js");


const Team = sequelize.define("Team", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  createdAt: "created_at",
  updatedAt: false,
});

module.exports = Team;