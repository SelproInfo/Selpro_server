const { User } = require('../../db.js');
const { Op } = require('sequelize');

const get_usersByName = async (user) => {

    // user = user.trim().toLowerCase();

    let response = await User.findOne({
        where: {
            user_name: user
        },
    });
    if (!response) {
        response = await User.findOne({
            where: {
                email: user
            }
        })
    }
    if (!response) {
        response = await User.findOne({
            where: {
                phone: user
            }
        })
    }
    if (!response) {
        response = await User.findOne({
            where: {
                company_name: user
            }
        })
    }
    if (!response) {
        response = await User.findOne({
            where: {
                num_ident: user
            }
        })
    }

    return response
};

module.exports = {
    get_usersByName,
};
