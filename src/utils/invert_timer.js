const { Invert_auction } = require('../db.js');
const { get_invertAuction_by_id } = require('../controllers/get/get_invert_auction_by_id_controller.js');

const invert_activate = async (auction_id, status, type) => {

    const id = auction_id;

    if (type === "IA") {
        const newStatus = {
            status
        };
        await Invert_auction.update(newStatus, {
            where: { id }
        });
        const invert = await get_invertAuction_by_id(id);

        return invert;
    }

}

module.exports = {
    invert_activate
}