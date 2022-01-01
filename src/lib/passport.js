const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const bcrypt = require('bcryptjs');


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField:'password',
    passReqToCallback: true
    },  async (req, username, password, done) => {
        const newUser = {
            username,
            password
        };
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                newUser.password = hash;
                pool.query('INSERT INTO users set ?', [newUser]);
                return done(null, newUser);
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });








