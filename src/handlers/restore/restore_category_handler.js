const { restore_category } = require('../../controllers/restore/restore_category_controller.js');

async function restore_category_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_category(id);
        if (!response) throw new Error("There was a problem restoring this category")
        res.status(200).send("Category restored successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_category_handler,
}