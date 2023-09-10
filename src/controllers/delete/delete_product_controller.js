const { Product } = require('../../db.js');

const delete_product = async (id) => {

    await Product.destroy(        
        {
            where: {
                id: id,
            }
        });

    return 'Soft-delete successfull'

}

module.exports = {
    delete_product,
}