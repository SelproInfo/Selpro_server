const { restore_invertAuction } = require('../../controllers/restore/restore_invert_auction_controller.js');

async function restore_invertAuction_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_invertAuction(id);
        if (!response) throw new Error("There was a problem restoring this invert auction")
        res.status(200).send('Restore successfull');
    } catch (error) { 
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_invertAuction_handler,
}