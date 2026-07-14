const team = require("./team.model.js");
const TeamMember = require("./teamMember.model.js");
const TeamEvent = require("./teamEvent.model.js");
const Trainee = require("../trainee/trainee.model.js");

const createTeam = async (name) => {
  return await team.create({ name });
};

const addMember = async (teamId, traineeId) => {
  const member = await TeamMember.create({
    team_id: teamId,
    trainee_id: traineeId,
  });
  await TeamEvent.create({
    team_id: teamId,
    event_type: "member_joined",
    reference_id: member.id,
  });
  return member;
};

const removeMember = async (teamId, traineeId, reason) => {
  const member = await TeamMember.findOne({
    where: { team_id: teamId, trainee_id: traineeId },
  });
  if (!member) {
    throw new Error("Member not found");
  }
  member.left_at = new Date();
  await member.save();
  const trainee = await Trainee.findByPk(traineeId);
  await TeamEvent.create({
    team_id: teamId,
    event_type: "member_left",
    reference_id: member.id,
    note: `${trainee.fullName} removed. ${reason || " "}`,
  });
  return member;
};

const getTimeline = async (teamId) => {
  return await TeamEvent.findAll({
    where: {
      team_id: teamId,
    },

    order: [["created_at", "DESC"]],
  });
};

module.exports = { createTeam, addMember, removeMember, getTimeline };