const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        require
    },
    email: {
        type: String,
        require: true,
        unique: true,
        maxlength: 100
    },
    about:{
        type: String,
    },
    file:{
        type:String,
        require
    }

})
module.exports=mongoose.model('user', userSchema)