const { get_auction_by_id } = require('../../controllers/get/get_auction_by_id_controller.js');
const { validate: validateUUID } = require('uuid');

async function get_AuctionById_handler(req, res) {
    try {
        const { auction_id } = req.params

        if (!auction_id)  return res.status(400).json("Falta data.")
        if (!validateUUID(auction_id)) throw new Error("ID inválida.")

        const response = await get_auction_by_id(auction_id);
        if (!response)  return res.status(404).json("No se ha encontrado esa subasta.")
        res.status(200).json(("Adquisición de datos exitosa.", response));

    } catch (error) {
        return res.status(500).json((error.message));
    }
}

module.exports = {
    get_AuctionById_handler,
}