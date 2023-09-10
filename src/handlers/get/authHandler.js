const { register } = require('../../controllers/get/auth_controller.js')

async function toRegister(req, res) {
    try {
        const { user_name } = req.body;
        if (!user_name) return res.status(400).json("Nombre de usuario incorrecto.");
        const result = await register(user_name);
        if (!result) return res.status(404).json({ message: "No se encontró el recurso solicitado." });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error interno del servidor.' });
    }
}

module.exports = {
    toRegister
}
