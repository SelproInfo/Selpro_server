const { delete_category } = require('../../controllers/delete/delete_category_controller.js');


async function delete_category_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_category(id);
        if (!response) throw new Error("There was a problem erasing this category")
        res.status(200).send("Category soft-deleted successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    delete_category_handler,
}