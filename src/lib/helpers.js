const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword =  (password) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            const password =  pool.query('INSERT INTO users set ?', hash);
        });
    });
};

module.exports = helpers;