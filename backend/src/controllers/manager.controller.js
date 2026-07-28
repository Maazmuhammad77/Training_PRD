const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Manager = require("../models/manager.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const HTTP_STATUSES = require("../utils/httpStatuses.js");

const generateToken = (managerId) => {
  return jwt.sign(
    {
      id: managerId,
      role: "MANAGER",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const manager = await Manager.findOne({
    where: { email },
  });

  if (!manager) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const hashedPassword = manager.passwordHash;

  if (!hashedPassword) {
    return res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Manager password field not found in database",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    return res.status(HTTP_STATUSES.UNAUTHORIZED).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateToken(manager.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(HTTP_STATUSES.OK).json({
    success: true,
    message: "Manager login successful",
    token,
    manager: {
      id: manager.id,
      name: manager.name,
      email: manager.email,
    },
  });
});

module.exports = {
  login,
};