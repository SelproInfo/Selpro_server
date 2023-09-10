const { getAllProd } = require('../../controllers/get/get_products_controller.js');

const getProdHandler = (req, res) => {
    getAllProd()
        .then(getAll => {
            if (!getAll) {
                return res.status(400).json({ message: "Error en la respuesta de la base de datos" });
            }
            return res.json({ message: "Respuesta exitosa", data: getAll });
        })
        .catch(error => {
            return res.status(400).json({ message: "Error en la respuesta de la base de datos", error: {} });
        });
};

module.exports = {
    getProdHandler,
};
