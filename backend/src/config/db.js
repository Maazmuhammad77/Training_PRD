const { Sequelize } = require("sequelize");

// create sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,     // database name
  process.env.DB_USER,     // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // disable SQL logs (true for debugging)
  }
);

// test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully ✅");
     await sequelize.sync();
     console.log("Table created successfully ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
    process.exit(1);
  }
};

module.exports =  { sequelize, connectDB} ;