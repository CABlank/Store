const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local', new LocalStrategy({
    usernameField: 'username',
    emailField:'email',
    passwordField: 'password',
    
},  (req, username, email, password, done) => {
    const newUser = {
        username,
        email,
        password
    };


    const user =  pool.query('INSERT INTO users set ?', [newUser]);
        console.log(newUser);
}));







