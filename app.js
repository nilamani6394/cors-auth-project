require('dotenv').config();
require('./config/database').connect();
const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const User = require("./model/user")
const auth = require('./middleware/auth')


const app = express()

app.use(express.json())


/**Token validation */
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to MyTag 🙌");
});

/**For user Registration */
app.post("/register", async (req, res) => {
     try {
      // Get user input
      const { firstName, lastName, email, password } = req.body;
      // Validate user input
      if (!(email && password && firstName && lastName)) {
         return res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedUserPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(), 
        password: encryptedUserPassword,
      });
  
      // Create token
      const token = jsonwebtoken.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
     return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(422).json({});
    }
    // Our register logic ends here
  });
/**For Login User */
app.post("/login",async(req,res)=>{
    try {
      /**required username and email */
      const {email,password} = req.body;

      if (!(email && password)) {
        return res.status(400).send("All input is required");
     }
     //validate the user if user exist in our database
     const user = await User.findOne({email});

     if(user &&(await bcrypt.compare(password,user.password))){
       const token = jsonwebtoken.sign(
         {user_id: user._id,email},
         process.env.TOKEN_KEY,
         {
           expiresIn:"5h"
         }
       );
       //store user token
       user.token = token;
       return res.status(200).json(user);
     }
    } catch (error) {
      console.log(error)
      return res.status(400).json({})
    }
});

module.exports = app;