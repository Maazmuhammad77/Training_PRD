const {
  getAllTrainees,
  updateTrainee,
  pendingTrainees,
} = require("../services/trainee.service");
const HTTP_STATUSES = require("../utils/httpStatuses.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Trainee } = require("../models/trainee.model.js");
const asyncHandler = require("../utils/asyncHandler.js");

const generateToken = (traineeId) => {
  return jwt.sign(
    {
      id: traineeId,
      role: "TRAINEE",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

const traineeLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const trainee = await Trainee.findOne({
    where: { email },
  });

  if (!trainee) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const hashedPassword =
    trainee.password || trainee.passwordHash || trainee.password_hash;

  if (!hashedPassword) {
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Trainee password field not found in database",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(trainee.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    message: "Trainee login successful",
    token,
    trainee: {
      id: trainee.id,
      name: trainee.name,
      email: trainee.email,
    },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const trainees = await getAllTrainees();

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    trainees,
  });
});

const update = asyncHandler(async (req, res) => {
  const trainee = await updateTrainee(req.params.id, req.body);

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    trainee,
  });
});

const pending = asyncHandler(async (req, res) => {
  const trainees = await pendingTrainees();

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    trainees,
  });
});

module.exports = {
  getAll,
  update,
  pending,
  traineeLogin,
};