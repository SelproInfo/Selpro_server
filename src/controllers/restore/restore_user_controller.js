const { User } = require('../../db.js');

const restore_user = async (id) => {

    await User.restore(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Restore successfull'

}

module.exports = {
    restore_user,
}
