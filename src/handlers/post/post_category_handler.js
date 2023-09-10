
const { create_category } = require('../../controllers/post/post_category_controller.js');

function post_category_handler(req, res) {
    const { category, data } = req.body;

    if (!category || !data) {
        return res.status(400).json('Faltan datos');
    }

    create_category(category, data)
    .then(response => {
      if (!response) {
        return res.status(500).json({ error: 'Error creando categorias.' });
      }
      res.status(200).json({ message: 'Las categorías se han creado correctamente.', response });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}  

module.exports = {
    post_category_handler
};