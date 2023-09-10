const { Category } = require('../../db.js');

const restore_category = async (id) => {

    await Category.restore(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Restore successfull'

}

module.exports = {
    restore_category,
}