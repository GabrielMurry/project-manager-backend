const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://GabrielMurry:${process.env.MONGO_DB_PASSWORD}@cluster0.hdvtgs4.mongodb.net/mgmt_db?retryWrites=true&w=majority`
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold); // cyan... using colors package and this will be colored (in order to use colors, we have to bring it in in our main index file)
};

module.exports = connectDB;
