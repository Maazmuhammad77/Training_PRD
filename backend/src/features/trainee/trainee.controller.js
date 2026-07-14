const { getAllTrainees, updateTrainee, pendingTrainees}= require("./trainee.service")
// get all trainees
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Trainee } = require("./trainee.model"); 


const generateToken = (traineeId) => {
  return jwt.sign(
    { 
      id: traineeId, 
      role: "TRAINEE" 
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

const traineeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const trainee = await Trainee.findOne({ 
        where: { email },
    });

    if (!trainee) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    
    const hashedPassword =
      trainee.password || trainee.passwordHash || trainee.password_hash;

    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Trainee password field not found in database",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    
    const token = generateToken(trainee.id);

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

 
    res.status(200).json({
      success: true,
      message: "Trainee login successful",
      token,
      trainee: {
        id: trainee.id,
        name: trainee.name,
        email: trainee.email,
       
      },
    });
  } catch (error) {
    console.error("Trainee Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getAll = async (req, res) => {  
    try {
        const trainees = await getAllTrainees();

        res.status(200).json({
            success: true , trainees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// update trainee details
const update = async (req, res) => { 

    try {
        const trainee = await updateTrainee(req.params.id, req.body);

        res.status(200).json({
            success: true,
            trainee
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const pending = async (req, res) => { 
    try {
       const trainees = await pendingTrainees();
      res.status(200).json({success: true, trainees });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = { getAll, update, pending, traineeLogin };