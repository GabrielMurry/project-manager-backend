const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold); // cyan... using colors package and this will be colored (in order to use colors, we have to bring it in in our main index file)
};

module.exports = connectDB;
