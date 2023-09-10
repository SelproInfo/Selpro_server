const { get_admin_users_controller } = require("../../controllers/admin_get/get_admin_users_controller")
const { paginateAu } = require("../../controllers/get/aux_filter_sort_page")


const get_admin_users_handler = async (req, res) => {
    const { page, pageSize } = req.query;
    try {
        const response = await get_admin_users_controller();
        const totalUsers = response.length;
        const paginateUsers = await paginateAu(response, page, pageSize);
        res.status(200).json({ total: totalUsers, data: paginateUsers });
    } catch (error) {
        res.status(400).send('Error al traer usuarios');
    }
};

module.exports = { get_admin_users_handler }