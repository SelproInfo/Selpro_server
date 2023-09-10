const { User, Auction, Invert_auction, Product, Auction_bid } = require("../../db.js");

const getUsers = async () => {
  return User.findAll({
    // include: [
    //   {
    //     model: Auction,
    //     model: Invert_auction,
    //     model: Product,
    //     model: Auction_bid,
    //     through: {
    //       attributes: []
    //     }
    //   }
    // ]
  });
};

module.exports = {
  getUsers
};
