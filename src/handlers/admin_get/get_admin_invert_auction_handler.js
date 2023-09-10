const { get_admin_invert_auction } = require("../../controllers/admin_get/get_admin_invert_auction_controller")


const get_admin_invert_auction_handler = async (req, res) => {
    try {
        const response = await get_admin_invert_auction()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send('Error al traer subastas inversas')
    }
}

module.exports = { get_admin_invert_auction_handler }