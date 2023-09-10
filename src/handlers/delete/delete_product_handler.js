const { delete_product } = require('../../controllers/delete/delete_product_controller.js');


async function delete_product_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_product(id);
        if (!response) throw new Error("There was a problem erasing this product")
        res.status(200).send("Product deleted successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    delete_product_handler,
}