const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email, password, done) => {
      try {
        //Save the information provided by the user to the the database
        const user = await UserModel.create({ email, password });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
  }));  

passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
}, async (email, password, done) => {
    try{
        const user = await UserModel.findOne({ email });
        if ( !user ){
            return done(null, false, {message : 'User not found'});
        }
    const validate = await user.isValidPassword(password);
    if (!valid){
        return done(null, false, { message : 'Incorrect Password'});
    }    
    return done (null, user, {message : 'Logged in Successfully'});
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTstrategy({
    secretOrKey : 'top_secret',
    jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
