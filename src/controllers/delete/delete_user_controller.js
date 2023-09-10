const { User } = require('../../db.js');

const delete_user = async (id) => {

    await User.destroy(
        {
            where: {
                id: id,
            }
        }
    );

    return 'soft-deleted successfully'

}

module.exports = {
    delete_user,
}
