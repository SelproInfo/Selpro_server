const { PreUser } = require('../../db');

const get_preuserByMail = async (email) => {
    let response = await PreUser.findOne({
        where: {
            email: email
        },
    });

    return response
};

module.exports = {
    get_preuserByMail,
};
