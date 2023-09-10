const { Auction, Product, Category, Sub_category, User, Auction_bid } = require('../../db.js'); // Asegúrate de importar sequelize
const { handle_status } = require('./handle_status.js');

const get_auction = async () => {
  try {
    const auctions = await Auction.findAll({
      where: {
        status: "Activa" // Filtra las subastas con el estado "Activa"
      },
      include: [
        {
          model: Product,
          include: [
            { model: Sub_category, include: Category }
          ]
        },
        {
          model: User,
          attributes: ['user_id', 'favorites', 'created_history']
        },
        {
          model: Auction_bid
        }
      ]
    });

    const formattedAuctions = await Promise.all(
      auctions.map(async auction => {
        const {
          id,
          base_price,
          close_date,
          Product: product,
          User: user,
          authorize,
          image,
          product_name,
          brand,
          description,
          datasheet,
          stock,
          status,
          type,
          subCategory,
          category,
          sale_price,
          Auction_bids // Access the associated Auction_bids here
        } = auction;

        const formattedAuctionBids = Auction_bids.map(bid => ({
          bid_id: bid.id,
          proposed_price: bid.proposed_price,
          UserId: bid.user_id
          // Include other relevant properties from Auction_bid if needed
        }));

        const timer = await handle_status(id, status, type, close_date);        

        return {
          id,
          base_price,
          close_date,
          authorize,
          image,
          product_name,
          brand,
          description,
          datasheet,
          status,
          stock,
          type,
          subCategory,
          category,
          sale_price,
          product,
          user,
          timer,
          auction_bids: formattedAuctionBids // Include the formatted Auction_bids
        };
      })
    );

    return formattedAuctions;

  } catch (error) {
    throw error;
  }
};

module.exports = {
  get_auction
};
