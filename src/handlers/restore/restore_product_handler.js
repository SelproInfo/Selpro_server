const { restore_product } = require('../../controllers/restore/restore_product_controller.js');


async function restore_product_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_product(id);
        if (!response) throw new Error("There was a problem restoring this product")
        res.status(200).send("Product restored successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_product_handler,
}