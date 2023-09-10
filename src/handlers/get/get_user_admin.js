const { getUsersAdmin } = require('../../controllers/get/get_user_admin.js');

const getUserAdmin = async (req, res) => {
    try {
        const users = await getUsersAdmin(req, res);
        if(!users) return res.status(400).json({ message: error.message });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { getUserAdmin };