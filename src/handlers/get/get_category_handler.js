const { getAllCategory } = require('../../controllers/get/get_category_controller.js');

function toCategory(req, res) {
    getAllCategory()
        .then(categories => {
            if (!categories) {
                return res.status(400).json({ message: "No se encontraron categorías." });
            }
            res.status(200).json({ message: "Funciona", categories });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

module.exports = {
    toCategory
};
