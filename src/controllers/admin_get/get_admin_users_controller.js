const { User, Auction, Invert_auction, Product, Auction_bid } = require("../../db.js");

// Define la función que devuelve una promesa para obtener todos los usuarios
const get_admin_users_controller = () => {
    return User.findAll({ paranoid: false });
};

module.exports = {
    get_admin_users_controller
};
