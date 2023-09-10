const { create_auction } = require('../../controllers/post/post_auction_controller.js');

async function post_auction_handler(req, res) {
    const { data } = req.body;
    try {
        const response = await create_auction(data);
        res.status(200).json(('La subasta ha sido creada correctamente', response));
    } catch (error) {
        res.status(500).json(('Se ha producido un error creando esta subasta.', error.message));
    }
}

module.exports = {
    post_auction_handler
};