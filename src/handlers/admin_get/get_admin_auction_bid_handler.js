const { get_admin_auction_bid_controller } = require("../../controllers/admin_get/get_admin_auction_bid_controller");
const { paginateAu } = require("../../controllers/get/aux_filter_sort_page");


const get_admin_auction_bid_handler = async (req, res) => {
    const { page, pageSize } = req.query;
    try {
        const response = await get_admin_auction_bid_controller();
        const totalAuBid = response.length;
        const paginatedAu = await paginateAu(response, page, pageSize);
        res.status(200).json({ total: totalAuBid, data: paginatedAu });
    } catch (error) {
        res.status(400).send('Error al traer ofertas');
    }
};

module.exports = { get_admin_auction_bid_handler }