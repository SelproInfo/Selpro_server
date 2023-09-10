const { Product, Sub_category, Auction, Invert_auction } = require('../../db.js');

// Función que obtiene todos los productos con subcategorías, subastas y subastas invertidas relacionadas utilizando promesas
const getAllProd = () => {
  return Product.findAll({
    include: [
      {
        model: Sub_category,
        attributes: [] // Excluir atributos de subcategoría
      },
      {
        model: Auction,
        attributes: ['id', 'base_price', 'close_date', 'sale_price', 'stock']
      },
      {
        model: Invert_auction,
        attributes: ['id', 'close_date', 'target_quantity', 'desired_price']
      }
    ],
  })
    .then(products => {
      return products;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllProd,
};
