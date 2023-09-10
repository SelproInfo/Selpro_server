const { delete_user } = require('../../controllers/delete/delete_user_controller.js');

async function delete_user_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_user(id);
        if (!response) throw new Error("There was a problem erasing this user")
        res.status(200).send("User soft-deleted successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    delete_user_handler
}