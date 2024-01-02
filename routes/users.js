const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/PinterestDB");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    accountId: {
        type: Number,
        trim: true
    },
    provider:{
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    fullname: {
        type: String,
        trim: true
    },
    birthdate: {
        type: Date,
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    }],
    profileImage: {
        type: String 
    }
});

userSchema.plugin(plm);
module.exports = mongoose.model('Users', userSchema);

