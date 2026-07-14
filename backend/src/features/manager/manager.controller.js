const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Manager = require("./manager.model");

const generateToken = (managerId) => {
  return jwt.sign(
    { id: managerId,
      role: "MANAGER"
     },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const manager = await Manager.findOne({ where : { email } });

    if (!manager) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const hashedPassword = manager.passwordHash;

    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Manager password field not found in database",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(manager._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Manager login successful",
      token,
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
};