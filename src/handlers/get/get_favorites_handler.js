const { get_favorites } = require("../../controllers/get/get_favorites");

const get_favorites_handler = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) return res.status(400).json("ID de usuario incorrecto.");
        const result = await get_favorites(user_id);
        if (!result) return res.status(404).json({ message: "No se encontró el usuario solicitado." });

        return res.status(200).json({message: "Los favoritos se han actualizado correctamente.", data: result});
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error interno del servidor.' });
    }
    
};

module.exports = {
 get_favorites_handler
};
