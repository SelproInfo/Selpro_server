const { get_admin_products_controller } = require("../../controllers/admin_get/get_admin_products_controller");
const { paginateAu } = require("../../controllers/get/aux_filter_sort_page");


const get_admin_product_handler = async (req, res) => {
    const { page, pageSize } = req.query;
    try {
        const response = await get_admin_products_controller();
        const totalProd = response.length;
        const paginateProd = await paginateAu(response, page, pageSize);
        res.status(200).json({ total: totalProd, data: paginateProd });
    } catch (error) {
        res.status(400).send('Error al traer productos');
    }
};

module.exports = { get_admin_product_handler }