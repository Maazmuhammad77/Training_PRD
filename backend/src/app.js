const express = require("express");

const dotenv = require("dotenv");

const inviteRoutes = require("./features/invite/invite.route.js");
const traineeRoutes = require("./features/trainee/trainee.route.js");
const projectRoutes = require("./features/project/project.route.js");
const goalRoutes = require("./features/goal/goal.route.js");
const teamRoutes = require("./features/team/team.route.js");
const dashboardRoutes = require("./features/dashboard/dashboard.route.js");
const announcementRoutes = require("./features/announcment/announcement.route.js");
const managerRoutes = require("./features/managerNote/manager.route.js")
dotenv.config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", inviteRoutes);
app.use("/api", traineeRoutes);
app.use("/api", projectRoutes);
app.use("/api", goalRoutes);
app.use("/api", teamRoutes);
app.use("/api",dashboardRoutes);
app.use("/api",announcementRoutes);
app.use("/api",managerRoutes)

module.exports = app;
