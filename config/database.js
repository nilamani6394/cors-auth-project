 const mongoose = require("mongoose");

// const { MONGO_URI } = process.env;

// exports.connect = () => {
//   // Connecting to the database
//   mongoose
//     .connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => {
//       console.log("Successfully connected to database");
//     })
//     .catch((error) => {
//       console.log("database connection failed. exiting now...");
//       console.error(error);
//       process.exit(1);
//     });
// };

const dotenv = require('dotenv')
dotenv.config({path:'./env'})

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
   useNewUrlParser: true, 
   useUnifiedTopology: true 
}, err => {
   if(err) throw err;
   console.log('Connected to MongoDB!!!')
})


// console.log('in db config');
// const mongoose = require('mongoose');
// const mongodb = 'mongodb://localhost/nest_main';
// mongoose.connect(mongodb);
// mongoose.Promise = global.Promise;

// module.exports = mongoose;