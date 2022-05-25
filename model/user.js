const mongoose = require('mongoose')

/**https://www.freecodecamp.org/news/how-to-authenticate-users-and-implement-cors-in-nodejs-applications/ */
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        default : null
    },
    lastName:{ 
        type : String,
        default: null
    },
    email:{
        type : String,
        default : null
    },
    password:{
       type : String,
       unique : true
    },
    token:{
     type : String
    }
})

module.exports=mongoose.model("user",userSchema); 