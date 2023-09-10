const { Category, Sub_category } = require('../../db.js');

// Función que obtiene todas las categorías y sus subcategorías relacionadas utilizando promesas
const getAllCategory = () => {
  return Category.findAll()
    .then(categories => {
      return categories;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllCategory,
};
