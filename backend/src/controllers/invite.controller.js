const {
  createInvite,
  acceptInviteService,
} = require("../services/invite.service.js");
const HTTP_STATUSES = require("../utils/httpStatuses.js");

const asyncHandler = require("../utils/asyncHandler.js");

const sendInvite = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const invite = await createInvite({
    email,
    managerId: "550e8400-e29b-41d4-a716-446655440000",
    // req.user.id
  });

  res.status(HTTP_STATUSES.CREATED).json({
    success: true,
    message: "Invite sent successfully",
    invite,
  });
});

const acceptInvite = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const traineeData = req.body;

  const trainee = await acceptInviteService({
    token,
    traineeData,
  });

  res.status(HTTP_STATUSES.CREATED).json({
    success: true,
    message: "Registration completed",
    trainee,
  });
});

module.exports = {
  sendInvite,
  acceptInvite,
};