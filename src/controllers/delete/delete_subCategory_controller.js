const { Sub_category } = require('../../db.js');

const delete_subCategory = async (id) => {

    await Sub_category.destroy(
        {
            where: {
                id: id,
            }
        }
    );

    return 'soft-deleted successfully'

}

module.exports = {
    delete_subCategory,
}