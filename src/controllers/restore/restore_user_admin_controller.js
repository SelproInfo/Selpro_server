const { User_admin } = require('../../db.js');

const restore_userAdmin = async (id) => {

    await User_admin.restore(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Restore successfull'

}

module.exports = {
    restore_userAdmin,
}