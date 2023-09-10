const { delete_subCategory } = require('../../controllers/delete/delete_subCategory_controller.js');

/*
A quien trabaje en esta app: Se que no es la mejor que se puede hacer, pero fue hecha con cariño y mucho esfuerzo.
Nada mas te deseo lo mejor y que puedas arreglar todos los problemas, y por favor que la cuides, hubo mucho esfuerzo
y noches sin sueño de parte de un hermoso grupo.
Seas quien seas, de todo corazon, gracias por cuidar de nuestro primer y pequeño hijo.
*/

async function delete_subCategory_handler(req, res) {
    const { id } = req.query
    try {
        const response = await delete_subCategory(id);
        if (!response) throw new Error("There was a problem erasing this category")
        res.status(200).send("Sub-category soft-deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    delete_subCategory_handler,
}

/*
PD: Si sos parte de este grupo y encontras esto, nos causó muchos dolores de cabeza, pero pudimos terminarla y decir que por fin somos programadores.
Deberiamos estar orgullosos de tremendo proyecto. Cuidalo con mucho cariño por favor, significa nuestro inicio en esta profesión y nuestro esfuerzo como
grupo de trabajo y como amigos.
*/