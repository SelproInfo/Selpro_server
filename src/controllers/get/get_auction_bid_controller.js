const { Auction_bid } = require("../../db.js");

// Función que obtiene todas las ofertas de subastas utilizando promesas
const getAuctionBid = () => {
  return Auction_bid.findAll()
    .then(auction_bids => {
      return auction_bids;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAuctionBid
};
