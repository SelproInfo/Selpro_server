const { Sub_category, Category, Product } = require("../../db.js");

const getAllSubCategories = () => {
  return Sub_category.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', "destroyTime"]
    },
    include: [
      // {
      //   model: Category, // Incluir la Categoría relacionada
      // },
      {
        model: Product, // Incluir los Productos relacionados
        include: {
          model: Sub_category // Incluir las Sub_categorías relacionadas con los Productos
        },
      },
    ],
  })
    .then(subCategories => {
      return subCategories;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllSubCategories
};
