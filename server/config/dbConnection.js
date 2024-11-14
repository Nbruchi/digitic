const { default: mongoose } = require("mongoose");

const dbConnection = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnection;
