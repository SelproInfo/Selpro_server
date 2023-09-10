const { Auction_bid } = require('../../db.js');

const restore_auctionBid = async (id) => {

    await Auction_bid.restore(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Restore successfull'

}

module.exports = {
    restore_auctionBid,
}