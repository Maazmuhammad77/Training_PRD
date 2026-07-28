const express = require("express");

const dotenv = require("dotenv");

const inviteRoutes = require("./routes/invite.route.js");
const traineeRoutes = require("./routes/trainee.route.js");
const projectRoutes = require("./routes/project.route.js");
const goalRoutes = require("./routes/goal.route.js");
const teamRoutes = require("./routes/team.route.js");
const dashboardRoutes = require("./routes/dashboard.route.js");
const announcementRoutes = require("./routes/announcement.route.js");
const managerRoutes = require("./routes/manager.route.js")
const errorHandler = require("./utils/errorHandler.js");
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

app.use(errorHandler);

module.exports = app;
