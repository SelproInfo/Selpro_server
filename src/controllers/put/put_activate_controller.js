const { Auction, Invert_auction } = require('../../db');
const { get_auction_by_id } = require('../get/get_auction_by_id_controller');
const { get_invertAuction_by_id } = require('../get/get_invert_auction_by_id_controller');
const { handle_status } = require('../get/handle_status');

const put_activate = async (auction_id, status, type) => {

    const id = auction_id;

        const newStatus = {
            status
        };
        await Auction.update(newStatus, {
            where: { id }
        });

        const auction = await get_auction_by_id(id);
        const { close_date } = auction;
        handle_status(auction_id, status, type, close_date)
        return auction;
}

module.exports = {
    put_activate
}