const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword =  (password) => {
    const salt =  bcrypt.genSalt(10);
    const hash =  bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword=  (password, savedPassword) => {
    bcrypt.compare(password, savedPassword, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            return true;
        } else {
            return false;
        }
    });
};



module.exports = helpers;