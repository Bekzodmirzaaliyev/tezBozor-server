const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Bekzod:6862442@cluster0.qn6t2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database Ulandi");
  } catch (e) {
    console.log("ERROR DATABASE: ", e);
  }
};

module.exports = connectDB;
