const { restore_auctionBid } = require('../../controllers/restore/restore_auction_bid_controller.js');

async function restore_auctionBid_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_auctionBid(id);
        if (!response) throw new Error("There was a problem restoring this bid")
        res.status(200).send("Bid restored successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_auctionBid_handler,
}