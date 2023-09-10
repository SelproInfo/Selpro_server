const { Product, Sub_category, Auction, Invert_auction } = require('../../db.js');

// Función que obtiene todos los productos con subcategorías, subastas y subastas invertidas relacionadas utilizando promesas
const get_admin_products_controller = () => {
  return Product.findAll({
    include: [
      {
        model: Sub_category,
        attributes: [], // Excluir atributos de subcategoría
        paranoid: false
      },
      {
        model: Auction,
        attributes: ['id', 'base_price', 'close_date', 'sale_price', 'stock'],
        paranoid: false
      },
      {
        model: Invert_auction,
        attributes: ['id', 'close_date', 'target_quantity', 'desired_price'],
        paranoid: false
      }
    ],
    paranoid: false
  })
    .then(products => {
      return products;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
    get_admin_products_controller,
};
