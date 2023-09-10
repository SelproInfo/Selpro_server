const { Auction_bid } = require("../../db.js");

const get_admin_auction_bid_controller = () => {
    return Auction_bid.findAll({ paranoid: false })
        .then(auction_bids => {
            return auction_bids;
        })
        .catch(error => {
            throw error;
        });
};

module.exports = {
    get_admin_auction_bid_controller
};
