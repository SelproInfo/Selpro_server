const { receiveWebhook } = require('../../controllers/post/mercado_pago_controller.js');

const weebhook_handler = async (req, res) => {
    try {
        const payment = req.query;
        if (!payment) throw new Error ("Ocurrió un error procesando este pago.");

        const response = await receiveWebhook(payment);

        if (!response) throw new Error()
        res.status(200).json(("pAGO COMPLETADO.", response));

    } catch (error) {
        if (error.message === 'Ocurrió un error procesando este pago.') {
            res.status(400).json((error.message));
        }
        res.status(500).json((error.message));
    }
}

module.exports = {
    weebhook_handler,
}