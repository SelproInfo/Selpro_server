const { restore_user } = require('../../controllers/restore/restore_user_controller.js');

async function restore_user_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_user(id);
        if (!response) throw new Error("There was a problem restored this user")
        res.status(200).send("User restored successfully");

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_user_handler
}