const { Auction_bid } = require('../../db.js');

const delete_auctionBid = async (id) => {

    await Auction_bid.destroy(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Soft-delete successfull'

}

module.exports = {
    delete_auctionBid,
}