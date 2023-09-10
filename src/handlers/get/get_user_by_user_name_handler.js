const { get_usersByName } = require('../../controllers/get/get_user_by_user_name_controller.js');

const get_UserByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) return res.status(400).json("Falta data.");

        const response = await get_usersByName(name);
        if (!response) return res.status(404).json(`Hubo un problema al adquirir al usuario: ${name}`);
        
        res.status(200).json({
            message: "Adquisición de datos exitosa",
            data: response
        });

    } catch (error) {
       return res.status(500).json(error.message);
    }
};

module.exports = { get_UserByName };
