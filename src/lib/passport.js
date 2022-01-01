const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField:'password',
    passReqToCallback: true
    }, async  (req, username, email, password, done) => {
    const newUser = {
        username,
        password
    };
    const user =  pool.query('INSERT INTO users set ?', [newUser]);
        console.log(newUser);
}));







