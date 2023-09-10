const { getUsers } = require("../../controllers/get/get_user_controller.js");

// Manejador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        // Obtiene la lista de usuarios utilizando getUsers()
        const users = await getUsers(); 
        // Si no se encuentran usuarios, devuelve una respuesta de error
        if (!users) {
            return res.status(400).json({ message: "Error al obtener usuarios." });
        }

        // Si no se encontraron usuarios, devuelve un mensaje de no encontrado
        if (users.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios." });
        } else {
            // Si hay usuarios, devuelve la lista de usuarios
            return res.status(200).json({ message: "Estos son los usuarios creados", users });
        }
    } catch (error) {
        // En caso de error, devuelve un mensaje de error
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers
};
