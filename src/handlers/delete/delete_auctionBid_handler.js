const { delete_auctionBid } = require('../../controllers/delete/delete_auctionBid_controller.js');

async function delete_auctionBid_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_auctionBid(id);
        if (!response) throw new Error("There was a problem erasing this bid")
        res.status(200).send("Bid soft-deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    delete_auctionBid_handler,
}