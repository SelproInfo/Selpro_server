const { User_admin } = require('../../db.js');

const delete_userAdmin = async (id) => {

    await User_admin.destroy(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Soft-deleted successfully'

}

module.exports = {
    delete_userAdmin,
}