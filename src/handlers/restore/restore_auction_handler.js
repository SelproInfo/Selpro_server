const { restore_auction } = require('../../controllers/restore/restore_auction_controller.js');

async function restore_auction_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_auction(id);
        if (!response) throw new Error("There was a problem restoring this auction")
        res.status(200).send("Auction restored successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_auction_handler,
}