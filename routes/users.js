const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://mongo:f6BChdGDE1-B4af14GEegc11Gh55cBah@roundhouse.proxy.rlwy.net:42207");

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

