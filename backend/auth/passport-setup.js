const passport = require('passport');
const dotenv = require('dotenv');
const session = require('express-session');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); 

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/redirect",
    passReqToCallback: true,
}, async (req, token, refreshToken, profile, done) => {
    try {
        let user = await User.findOneAndUpdate(
            { googleId: profile.id }, 
            {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                picture: profile.photos[0]?.value, 
            },
            { new: true, upsert: true } // Options to return the new document and create if it doesn't exist
        );
        done(null, user);
    } catch (error) {
        console.error("Error in user registration: ", error);
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(error => done(error, null));
});
