const { Product } = require('../../db.js');
const { uploadFile } = require('../../utils/PDFCloudinaryConfig.js');
const { uploadProd } = require('../../utils/productCloudinaryConfig.js');

const put_prod_controller = async (
  id,
  name,
  brand,
  image,
  description,
  datasheet,
  rating,
  stock
) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error('Producto no encontrado.');
  }

  const [cloudImage, cloudDatasheet] = await Promise.all([
    uploadProd(image),
    uploadFile(datasheet),
  ]);

  const changed_product = {};

  if (!!name) {
    changed_product.name = name;
  }
  if (!!brand) {
    changed_product.brand = brand;
  }
  if (!!image) {
    changed_product.image = cloudImage;
  }
  if (!!description) {
    changed_product.description = description;
  }
  if (!!datasheet) {
    changed_product.datasheet = cloudDatasheet;
  }
  if (!!rating) {
    changed_product.rating = rating;
  }
  if (!!stock) {
    changed_product.stock = stock;
  }

  const [updatedRows] = await Product.update(changed_product, {
    where: {
      id: id,
    },
  });

  if (updatedRows > 0) {
    const updatedProduct = await Product.findByPk(id);
    return updatedProduct;
  }
  throw new Error('No se puede actualizar el producto');
};

module.exports = {
  put_prod_controller,
};
