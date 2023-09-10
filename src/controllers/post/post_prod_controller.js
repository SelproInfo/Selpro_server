const { Product, Sub_category, User } = require('../../db.js');
const { productCloudinaryConfig } = require('../../utils/productCloudinaryConfig.js');
const { uploadFile } = require('../../utils/PDFCloudinaryConfig.js');

const postProductC = async (productArray) => {
  const createdProducts = [];

  for (const productData of productArray) {
    const {
      name,
      brand,
      image,
      description,
      datasheet,
      ref_subCategory,
      user_id
    } = productData;

    const [cloudImage, cloudDatasheet] = await Promise.all([
      productCloudinaryConfig(image),
      uploadFile(datasheet),
    ]);

    const foundRef = await Sub_category.findOne({ where: { id: ref_subCategory } });
    if (!foundRef) {
      throw new Error("Sub-categoría no encontrada.");
    }

    const prodCount = await Product.count({ where: { SubCategoryId: ref_subCategory } });
    const newID = prodCount + 1;
    const productId = `${ref_subCategory}${newID}`;

    const product = {
      id: productId,
      name,
      brand,
      image: cloudImage,
      description,
      datasheet: cloudDatasheet,
      SubCategoryId: ref_subCategory,
      UserId: user_id ? user_id : null
    };

    const newProds = await Product.bulkCreate([product], { returning: true });

    await Promise.all(newProds.map(newProd => newProd.setSub_category(foundRef)));

    createdProducts.push(...newProds);
  }

  return createdProducts;
};

module.exports = { postProductC };