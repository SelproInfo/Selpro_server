const { delete_userAdmin } = require('../../controllers/delete/delete_userAdmin_controller.js');

async function delete_userAdmin_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_userAdmin(id);
        if (!response) throw new Error("There was a problem erasing this admin")
        res.status(200).send("Administrator soft-deleted successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    delete_userAdmin_handler
}