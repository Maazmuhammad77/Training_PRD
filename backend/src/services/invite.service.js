const Invite = require("../models/invite.model.js");
const Trainee = require(
  "../models/trainee.model.js"
);
const ApiError = require("../utils/ApiError.js");
const bcrypt = require(
  "bcryptjs"
);
const generateToken = require(
  "../utils/generateToken"
);

const sendEmail = require(
  "../utils/sendEmail"
);


const createInvite = async ({
  email,
  managerId,
}) => {

  // GENERATE UNIQUE TOKEN
  const token = generateToken();

  // EXPIRE AFTER 48 HOURS
  const expiresAt = new Date(
    Date.now() + 48 * 60 * 60 * 1000
  );

  // SAVE INVITE IN DATABASE
  const invite = await Invite.create({
   email,
   token,
   invitedBy: managerId,
   expiresAt,
   status: "pending",
  });

  // CREATE FRONTEND REGISTRATION LINK
  const inviteLink =
`${process.env.CLIENT_URL}/register/${token}`;

  console.log(
    "Invite Link:",
    inviteLink
  );

  // SEND REAL EMAIL
  await sendEmail({
    to: email,
    subject: "Algorithm Training Invite",
    html: `

      <div
        style="
          font-family: Arial;
          padding: 20px;
        "
      >

        <h2>
          You are invited to
          Algorithm Training
        </h2>

        <p>
          Click the button below
          to complete your registration.
        </p>

        <a
          href="${inviteLink}"

          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:6px;
            margin-top:10px;
          "
        >
          Complete Registration
        </a>

        <p
          style="
            margin-top:20px;
            color:gray;
          "
        >
          This invite link will
          expire in 48 hours.
        </p>

      </div>
    `,
  });

  return invite;
};

const acceptInviteService = async ({
  token,
  traineeData,
}) => {

  // GET DATA FROM FRONTEND
  const {
    fullName,
    password,
    background,
    track,
  } = traineeData;


  // ====================================================
  // FIND INVITE USING TOKEN
  // ====================================================

  const invite =
    await Invite.findOne({
      where: {
        token,
      },
    });

  // CHECK IF INVITE EXISTS
  if (!invite) {

    throw new ApiError(
      400,
      "Invalid invite token"
    );
  }


  
  // CHECK IF INVITE EXPIRED

  if (
    new Date() >
    invite.expiresAt
  ) {

    throw new ApiError(
      400,
      "Invite expired"
    );
  }
  
  // CHECK IF INVITE ALREADY USED
  if (
    invite.status ===
    "accepted"
  ) {

    throw new ApiError(
      400,
      "Invite already used"
    );
  }
 
  // HASH PASSWORD
  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  // CREATE TRAINEE ACCOUNT
  const trainee =
    await Trainee.create({

      // TRAINEE NAME
      fullName,

      // EMAIL COMES FROM INVITE
      email:
        invite.email,

      // HASHED PASSWORD
      password:
        hashedPassword,

      // BACKGROUND
      background,

      // TRACK
      track,

      // ACTIVE STATUS
      status:
        "active",

      // START DATE
      startDate:
        new Date(),

      // RELATION WITH INVITE
      inviteId:
        invite.id,
    });

  invite.status =
    "accepted";

  invite.acceptedAt =
    new Date();
  await invite.save();

  return trainee;
};

module.exports = {
  createInvite, acceptInviteService
};