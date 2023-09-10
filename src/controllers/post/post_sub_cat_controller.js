const { Category, Sub_category } = require('../../db.js');
const { Op } = require("sequelize");


const create_subCategory = async (type, data) => {

    // * Verificacion si ya existe ese nombre guardado

    const exist = await Promise.all(data.map(async (data) => {
        const { name } = data
        const exist = name.map(async (sub_name) => {
            return await Sub_category.findOne({
                where: {
                    name: sub_name,
                }
            });
        })

        return Promise.all(exist)
    }));
    const verify = await Promise.all(exist)

    if (verify[0].some(result => result !== null)) {
        throw new Error("El nombre de esta categoría ya existe.")
    }

    const response = await Promise.all(
        data.map(async (data) => {
            const { id_category, name } = data;
            const category = await Category.findByPk(id_category)

            if (!category) throw new Error("Falta categoría.");

            const sub_category_id = await Sub_category.count({
                where: {
                    id: {
                        [Op.startsWith]: id_category
                    }
                },
            });

            let counter = sub_category_id + 1;

            for (const subCategory_name of name) {

                const id = `${id_category}${counter}`;
                await Sub_category.create({
                    id,
                    name: subCategory_name,
                    type,
                    CategoryId: id_category
                });

                counter++;
            }
        })
    )

    return response;

}

module.exports = {
    create_subCategory
};