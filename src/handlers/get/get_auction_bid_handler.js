const { getAuctionBid } = require("../../controllers/get/get_auction_bid_controller.js");

const getAllAuctionBids = (req, res) => {
    getAuctionBid()
        .then(bids => {
            if (!bids) {
                return res.status(400).json({ message: "No se encontraron pujas." });
            }

            if (bids.length === 0) {
                return res.status(404).json({ message: "No se encontró ninguna puja para este producto." });
            } else {
                return res.status(200).json({ message: "Estas son las pujas de este producto.", bids });
            }
        })
        .catch(error => {
            return res.status(500).json(error.message);
        });
};

module.exports = {
    getAllAuctionBids
};
