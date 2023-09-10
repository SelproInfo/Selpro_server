const { mercado_pago } = require('../../controllers/post/mercado_pago_controller.js');

const mercado_pago_handler = async (req, res) => {
    try {
        const { id, product, } = req.body;

        if (!id ||!product) throw new Error ("Falta data.");

        const response = await mercado_pago(req.body);

        if (!response) throw new Error()
        res.status(200).json((response));

    } catch (error) {
        if (error.message === 'Falta data.') {
            res.status(400).json((error.message));
        }
        res.status(500).json((error.message));
    }
}

module.exports = {
    mercado_pago_handler,
}