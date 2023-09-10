const { Category } = require('../../db.js');

const delete_category = async (id) => {

    await Category.destroy(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Soft-delete successfull'

}

module.exports = {
    delete_category,
}