const { Invert_auction } = require('../../db.js');

const delete_invertAuction = async (id) => {

    await Invert_auction.destroy(        
        {
            where: {
                id: id,
            }
        });

    return 'Soft-delete successfull'

}

module.exports = {
    delete_invertAuction,
}
