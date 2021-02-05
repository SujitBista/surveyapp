const express = require('express'); //make uses of common js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();
//client id: 
//clientsecret: 
passport.use(
 new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' 
}, 
//callbackURL is called afer the user grants permission to our app
//all the information that we get from the google like user profile will be
//accesed on this callback function, the is a second argument on GoogleStrategy
//aftert the code gets exchage with the google server google server will allow us to have
//access to user profile information
(accessToken, refreshToken, profile, done) => {
    console.log('access token' ,accessToken);
    console.log('refresh token' ,refreshToken);
    console.log('profile' ,profile);
}
)
);

//(Login button)localhost:5000/auth/google 
//our application has forwared request to the google
//route handler to handle the request
//get type http request
// second argument is the code to be executed when request comes to /auth/google
app.get(
     '/auth/google',
     passport.authenticate('google', {
        scope: ['profile', 'email']
})
);
//After user grants permission the google server will redirect to our server with the
//given url /auth/google/callback 
app.get('/auth/google/callback', passport.authenticate('google'));
const PORT = process.env.PORT || 5000;
app.listen(PORT);