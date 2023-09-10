const { create_invert_auction } = require('../../controllers/post/post_inv_auction_controller.js');

async function post_invert_auction_handler(req, res) {
    const { data } = req.body;
    try {
        const response = await create_invert_auction(data);
        res.status(200).json(('La subasta inversa ha sido creada correctamente', response));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    post_invert_auction_handler
};