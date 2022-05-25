const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
// https://github.com/joshlong/spring_io...
//https://www.youtube.com/watch?v=OHjVhTQ3j6g
exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};