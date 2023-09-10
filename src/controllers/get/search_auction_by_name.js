const { Auction, Invert_auction } = require("../../db.js");
const { Op } = require('sequelize');

// Define la función que devuelve una promesa para buscar productos por nombre
const productByName = (product_name) => {
    // Limpia espacios en blanco al inicio y al final del nombre del producto
    product_name = product_name.trim();

    // Promesa que busca subastas con el nombre de producto proporcionado
    const findAuctions = Auction.findAll({
        where: {
            product_name: {
                [Op.iLike]: `%${product_name}%`
            }
        }
    });
    
    // Promesa que busca subastas invertidas con el nombre de producto proporcionado
    const findInvertAuctions = Invert_auction.findAll({
        where: {
            product_name: {
                [Op.iLike]: `%${product_name}%`
            }
        }
    });

    const findBrandAuctions = Auction.findAll({
        where: {
            brand: {
                [Op.iLike]: `%${product_name}%`
            }
        }
    });
    
    const findBrandInvertAuctions = Invert_auction.findAll({
        where: {
            brand: {
                [Op.iLike]: `%${product_name}%`
            }
        }
    });

    // Retorna una promesa que resuelve cuando ambas consultas están completas
    return Promise.all([findAuctions, findInvertAuctions, findBrandAuctions, findBrandInvertAuctions]).then(([auctions, invert_auctions, brandAuctions, brandInvertAuctions]) => {
        return [...auctions, ...invert_auctions, ...brandAuctions, ...brandInvertAuctions];
    });
};

module.exports = {
    productByName
};
