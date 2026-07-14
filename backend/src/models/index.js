// ============================================
// models/index.js
// Central place where ALL Sequelize associations live.
// Every model file (Trainee.model.js, Project.model.js, etc.)
// exports ONLY the bare model — it knows nothing about
// other models. This file is the only place that wires
// relationships together. Everywhere else in the app should
// import models FROM HERE, not from individual model files,
// so associations are always attached.
// ============================================

const Manager = require("../features/manager/manager.model.js");
const Invite = require("../features/invite/invite.model.js");
const Trainee = require("../features/trainee/trainee.model.js");
const Goal = require("../features/goal/goal.model.js");
const Project = require("../features/project/project.model.js");
const Team = require("../features/team/team.model.js");
const TeamMember = require("../features/team/teamMember.model.js");
const TeamEvent = require("../features/team/teamEvent.model.js");
const Announcement = require("../features/announcment/announcement.model.js");
const ManagerNote = require("../features/managerNote/managernote.model.js");

// ------------------------------------------------
// 1. Manager → Invite (1:M)
// One manager sends many invites.
// ------------------------------------------------
Manager.hasMany(Invite, { foreignKey: "invitedBy" });
Invite.belongsTo(Manager, { foreignKey: "invitedBy" });

// ------------------------------------------------
// 2. Invite → Trainee (1:1)
// One invite becomes exactly one trainee account once accepted.
// FK lives on Trainee (inviteId), so it's hasOne from Invite's side.
// ------------------------------------------------
Invite.hasOne(Trainee, { foreignKey: "inviteId" });
Trainee.belongsTo(Invite, { foreignKey: "inviteId" });

// ------------------------------------------------
// 3. Trainee → Goal (1:M)
// One trainee has many goals.
// ------------------------------------------------
Trainee.hasMany(Goal, { foreignKey: "traineeId" });
Goal.belongsTo(Trainee, { foreignKey: "traineeId" });

// ------------------------------------------------
// 4. Project ownership — POLYMORPHIC (solo vs team)
// Project.traineeId is set when type = "solo"
// Project.teamId is set when type = "team"
// Both FKs are nullable; exactly one is filled depending on `type`.
// This is NOT a true Sequelize polymorphic association —
// it's two separate optional belongsTo relations.
// Enforce "exactly one filled" in the SERVICE layer, not here.
// ------------------------------------------------
Trainee.hasMany(Project, { foreignKey: "traineeId" });
Project.belongsTo(Trainee, { foreignKey: "traineeId", as: "owner" });

Team.hasMany(Project, { foreignKey: "teamId" });
Project.belongsTo(Team, { foreignKey: "teamId", as: "ownerTeam" });

// ------------------------------------------------
// 5. Trainee ↔ Team — MANY-TO-MANY via TeamMember
// One trainee can belong to multiple teams.
// One team has multiple trainees.
// TeamMember is the join table AND carries extra fields
// (joinedAt, leftAt) — so we model it as two separate
// hasMany/belongsTo pairs (NOT belongsToMany), because we
// need to query TeamMember rows directly (e.g. "who left and when").
// ------------------------------------------------
Team.hasMany(TeamMember, { foreignKey: "teamId" });
TeamMember.belongsTo(Team, { foreignKey: "teamId" });

Trainee.hasMany(TeamMember, { foreignKey: "traineeId" });
TeamMember.belongsTo(Trainee, { foreignKey: "traineeId" });

// If you ALSO want direct "give me all trainees in this team"
// without going through TeamMember manually, add the M:M shortcut
// on top of the above (Sequelize allows both at once):
Team.belongsToMany(Trainee, {
  through: TeamMember,
  foreignKey: "teamId",
  otherKey: "traineeId",
  as: "members",
});
Trainee.belongsToMany(Team, {
  through: TeamMember,
  foreignKey: "traineeId",
  otherKey: "teamId",
  as: "teams",
});

// ------------------------------------------------
// 6. Team → TeamEvent (1:M) — the timeline log
// Append-only, read-only. Never updated or deleted, only created.
// ------------------------------------------------
Team.hasMany(TeamEvent, { foreignKey: "teamId" });
TeamEvent.belongsTo(Team, { foreignKey: "teamId" });

// ------------------------------------------------
// 7. Manager → Announcement (1:M)
// ------------------------------------------------
Manager.hasMany(Announcement, { foreignKey: "postedBy" });
Announcement.belongsTo(Manager, { foreignKey: "postedBy" });

// ------------------------------------------------
// 8. Trainee → ManagerNote (1:M)
// Internal notes, not visible to the trainee themselves.
// ------------------------------------------------
Trainee.hasMany(ManagerNote, { foreignKey: "traineeId" });
ManagerNote.belongsTo(Trainee, { foreignKey: "traineeId" });

// ------------------------------------------------
// Export every model from this single file.
// Every service/controller in the app should import models
// like this:
//   const { Trainee, Goal } = require("../../models/index.js");
// NOT directly from the individual model files, or you'll get
// a model object with no associations attached.
// ------------------------------------------------
module.exports = {
  Manager,
  Invite,
  Trainee,
  Goal,
  Project,
  Team,
  TeamMember,
  TeamEvent,
  Announcement,
  ManagerNote,
};