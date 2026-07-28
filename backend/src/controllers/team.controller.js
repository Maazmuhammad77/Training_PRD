const {
  createTeam,
  addMember,
  removeMember,
  getTimeline,
} = require("../services/team.service");

const asyncHandler = require("../utils/asyncHandler.js");
const HTTP_STATUSES = require("../utils/httpStatuses.js");
const createTeams = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const team = await createTeam(name);

  res.status(HTTP_STATUSES.CREATED).json(team);
});

const addMembers = asyncHandler(async (req, res) => {
  const { teamId, traineeId } = req.body;

  const member = await addMember(teamId, traineeId);

  res.status(HTTP_STATUSES.CREATED).json(member);
});

const removeMembers = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const { teamId, traineeId } = req.params;

  const member = await removeMember(teamId, traineeId, reason);

  res.status(HTTP_STATUSES.OK).json(member);
});

const getTimelines = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const timeline = await getTimeline(teamId);

  res.status(HTTP_STATUSES.OK).json(timeline);
});

module.exports = {
  createTeams,
  addMembers,
  removeMembers,
  getTimelines,
};