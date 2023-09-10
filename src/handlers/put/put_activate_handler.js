const { put_activate } = require("../../controllers/put/put_activate_controller");


const put_activate_handler = async (req, res) => {
    try {
        const { id, status, type } = req.query

        if (!id || !status || !type) throw new Error ("Falta data.");
        if (status !== "Activa" ) throw new Error ("Estado incorrecto.");
        const response = await put_activate(id, status, type);
        if (!response) throw new Error("Hubo un problema actualizando el estatus.")
        res.status(200).json(("El estatus se ha actualizado correctamente:", response));

    } catch (error) {
        if (error.message === 'Falta data') {
            return res.status(400).json((error.message));
        }
        res.status(500).json((error.message));
    }
}

module.exports = {
    put_activate_handler,
}