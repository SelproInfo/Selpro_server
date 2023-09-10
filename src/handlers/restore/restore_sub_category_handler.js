const { restore_subCategory } = require('../../controllers/restore/restore_sub_category_controller.js');


async function restore_subCategory_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_subCategory(id);
        if (!response) throw new Error("There was a problem restoring this category")
        res.status(200).send("Sub-category restored successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_subCategory_handler,
}