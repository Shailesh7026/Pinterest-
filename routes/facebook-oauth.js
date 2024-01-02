const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config()
var userModel = require('./users');


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        // setting user name cookie for get details in profile page 
        username = profile.displayName;
        request.res.cookie('username', username);

        const user = await userModel.findOne({
            accountId: profile.id,
            provider: 'facebook',
        });

        console.log(profile);
        if(!user)
        {
            console.log("user not found adding to db...");
            const user = await userModel.create({
                accountId: profile.id,
                username: profile.displayName,
                provider: profile.provider,
            });
            return done(null,profile);
        }
        else{
            console.log("user already exits...");
            return done(null,profile);
        }

    }
));