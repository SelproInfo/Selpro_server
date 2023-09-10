const { Product } = require('../../db.js');

const restore_product = async (id) => {

    await Product.restore(        
        {
            where: {
                id: id,
            }
        });

    return 'Restore successfull'

}

module.exports = {
    restore_product,
}