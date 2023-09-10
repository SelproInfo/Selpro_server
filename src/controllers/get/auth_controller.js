const { User } = require('../../db.js');


async function register(user_name) {
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
        throw new Error('El nombre de usuario ya está en uso');
    }
}

module.exports = { 
    register 
};

