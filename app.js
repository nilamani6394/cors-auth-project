require('dotenv').config();
require('./config/database').connect();
const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express')
const User = require("./model/user")

const API_PORT =4001
const MONGO_URI= 'mongodb://localhost:27017/mydb'
const TOKEN_KEY=MayhemWardlo

const app = express()

app.use(express.json)

/**For user Registration */
app.post("/register",async(req,res)=>{
    try {
        /**Get user input */
        const {firstName,email,password } = req.body

        if(!(email && firstName && password)){
            res.status(400).send("All input is required")
        }
        /**Check if user is already exist  */
        const olderUser = await User.findOne({email});//awit

        if(olderUser){
            return res.status(409).send("This username already exist please login ")
        }
        /**Encrypt password */
        encryptedUserPassword = await bcrypt.hash(password,10);
        //create a user inour database
        const user = await User.create({
            firstName : firstName,
            email : email.toLowerCase(),
            password : encryptedUserPassword
        })
        //create a token
        const token = jwt.sign(
            {user_id : user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn : '2h',
            }
        );
        /**save user token */
        user.token = token;
        /**return new user */
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }

});
/**For Login User */
app.post("/loginr",(req,res)=>{
    
})

module.exports = app;