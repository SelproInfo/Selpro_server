const { get_admin_auction } = require("../../controllers/admin_get/get_admin_auction_controller");
const { get_admin_invert_auction } = require("../../controllers/admin_get/get_admin_invert_auction_controller");
const { sortAuctions, getAuBySubCategory, getAuByCategory, getAuByType, paginateAu, statusAu } = require("../../controllers/get/aux_filter_sort_page");
const { productByName } = require("../../controllers/get/search_auction_by_name");


const get_admin_all_auctions_handler = async (req, res) => {
    const { page, pageSize, type, category, subcategory, sort, name, status } = req.query
    try {
        const response1 = await get_admin_auction();
        const response2 = await get_admin_invert_auction();
        let finalResponse = [...response1, ...response2]
        finalResponse.sort(() => Math.random() - 0.5);
        if (name) {
            finalResponse = await productByName(name)
            if (!finalResponse) {
                res.status(400).send('No se encontraron resultados de su busqueda')
            }
        }
        if (sort) {
            finalResponse = await sortAuctions(sort, finalResponse)
            if (!finalResponse) {
                res.status(400).send('No se encontraron subastas con el orden especificado')
            }
        }
        if (subcategory) {
            finalResponse = await getAuBySubCategory(subcategory, finalResponse);
            if (!finalResponse) {
                res.status(400).send('No hay subastas del tipo seleccionado');
            }
        }
        if (category) {
            finalResponse = await getAuByCategory(category, finalResponse);
            if (!finalResponse) {
                res.status(400).send('No hay subastas del tipo seleccionado');
            }
        }
        if (type) {
            finalResponse = await getAuByType(type, finalResponse);
            if (!finalResponse) {
                res.status(400).send('No hay subastas del tipo seleccionado');
            }
        }
        if (status) {
            finalResponse = await statusAu(status, finalResponse)
            if(!finalResponse) {
                res.status(400).send(`No hay subastas de estatus ${status}`)
            }
        }

        const totalAu = finalResponse.length
        const paginatedAu = paginateAu(finalResponse, page, pageSize)
        res.status(200).json({ total: totalAu, data: paginatedAu })
    } catch (error) {
        res.status(400).send('Error al traer todas las subastas')
    }
}

module.exports = { get_admin_all_auctions_handler }