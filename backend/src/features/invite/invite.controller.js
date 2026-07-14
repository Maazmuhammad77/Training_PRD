const {
  createInvite,
  acceptInviteService
} = require("./invite.service");


const sendInvite = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const invite = await createInvite({
      email,
      managerId: "550e8400-e29b-41d4-a716-446655440000",
      // req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Invite sent successfully",
      invite,
    });

  } catch (error){

    res.status(500).json({
      success: false,
      message: error.message, error
    });
  }
};

const acceptInvite = async (
  req,
  res
) => {

  try {

    const { token } = req.params;
    const traineeData = req.body;

    const trainee =
      await acceptInviteService({
        token,
        traineeData,
      });

    res.status(201).json({
      success: true,
      message:
      "Registration completed",
      trainee,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendInvite,
  acceptInvite,
};