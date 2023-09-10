const { delete_auction } = require('../../controllers/delete/delete_auction_controller.js');

async function delete_auction_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_auction(id);
        if (!response) throw new Error("There was a problem erasing this auction")
        res.status(200).json(("Auction soft-deleted successfully"));
    } catch (error) {
        res.status(500).send (error.message);
    }
}

module.exports = {
    delete_auction_handler,
}