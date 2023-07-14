const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const connection = async () => {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log("DB Connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
