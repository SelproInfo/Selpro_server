const { Sub_category } = require('../../db.js');

const restore_subCategory = async (id) => {

    await Sub_category.restore(
        {
            where: {
                id: id,
            }
        }
    );

    return 'restore successfull'

}

module.exports = {
    restore_subCategory,
}