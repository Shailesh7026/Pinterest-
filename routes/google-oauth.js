const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()
var userModel = require('./users');
const { response } = require('../app');
passport.use(new GoogleStrategy({
    clientID:    process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // setting user name cookie for get details in profile page 
     username = profile.displayName;
     request.res.cookie('username', username);

      const user = await userModel.findOne({
          accountId: profile.id,
          provider: 'google',
      });

      if(!user)
      {
          console.log(profile);
          console.log("user not found adding to db...");
          const user = await userModel.create({
              accountId: profile.id,
              username: profile.displayName,
              provider: profile.provider,
              email: profile.email,
              dp: profile.picture,
              birthdate: profile.birthday,
              fullname: profile.name.givenName + " " + profile.name.familyName,
          });
          return done(null,profile);
      }
      else{
          console.log("user already exits...");
          return done(null,profile);
          
        }
        
  }
));

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});