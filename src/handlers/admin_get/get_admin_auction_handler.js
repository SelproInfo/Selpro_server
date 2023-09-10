const { get_admin_auction } = require("../../controllers/admin_get/get_admin_auction_controller")


const get_admin_auction_handler = async (req, res) => {
    try {
        const response = await get_admin_auction()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send('Error al traer las subastas')
    }
}

module.exports = { get_admin_auction_handler }