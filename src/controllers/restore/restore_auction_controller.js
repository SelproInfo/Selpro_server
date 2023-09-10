const { Auction } = require('../../db.js');

const restore_auction = async (id) => {

    await Auction.restore(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Restore successfull'

}

module.exports = {
    restore_auction,
}