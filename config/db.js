const mongoose = require("mongoose");

let mongoDBUrl;

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    mongoDBUrl = process.env.MONGODB_TEST;
  } else {
    mongoDBUrl = process.env.MONGODB_URI;
  }
  const conn = await mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  console.log(`Database connected successfully to ${conn.connection.host}`);
};

module.exports = connectDB;
