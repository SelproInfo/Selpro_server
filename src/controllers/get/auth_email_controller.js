const { PreUser } = require('../../db');


async function register(email) {
    const existingUser = await PreUser.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('El email ya está en uso');
    }
}

module.exports = { 
    register 
};
