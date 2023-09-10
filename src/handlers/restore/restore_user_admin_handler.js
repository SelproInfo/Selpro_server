const { restore_userAdmin } = require('../../controllers/restore/restore_user_admin_controller.js');

async function restore_userAdmin_handler(req, res) {
    const { id } = req.query
    try {
        const response = await restore_userAdmin(id);
        if (!response) throw new Error("There was a problem restoring this admin")
        res.status(200).send("Administrator restored successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    restore_userAdmin_handler
}