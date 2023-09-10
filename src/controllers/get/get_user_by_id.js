const { User } = require('../../db.js');

const userById = async (userId) => {

    const user = await User.findByPk(userId);

    return user;
};

module.exports = {
    userById
};