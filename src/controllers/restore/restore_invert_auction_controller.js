const { Invert_auction } = require('../../db.js');

const restore_invertAuction = async (id) => {

    await Invert_auction.restore(        
        {
            where: {
                id: id,
            }
        });

    return 'Restore successfull'

}

module.exports = {
    restore_invertAuction,
}
