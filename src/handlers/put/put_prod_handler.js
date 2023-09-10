const { put_prod_controller } = require("../../controllers/put/put_prod_controller.js");


const put_prod_handler= async (req, res) => {
  const { id } = req.params
  const { name, brand, image, description, datasheet, rating, stock, price } = req.body;
  try {
    const product = await put_prod_controller(id, name, brand, image, description, datasheet, rating, stock, price)
    if(!product) res.json(({ error: error.message }, {}))
    return res.status(200).json(('Producto actualizado correctamente', product))
  } catch (error) {
    res.json(({ error: error.message }, {}))
  }
}

module.exports = {
  put_prod_handler
}