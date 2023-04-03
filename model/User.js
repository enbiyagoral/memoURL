const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Url : {
        type: mongoose.Schema.Types.ObjectId,
        ref: ''
    },
})


userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();
})


const User = mongoose.model('User',userSchema);
module.exports = User;
