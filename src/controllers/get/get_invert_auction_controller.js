const { Invert_auction, Product, Category, Sub_category, User, Auction_bid } = require('../../db.js'); // Asegúrate de importar sequelize
const { handle_status } = require('./handle_status.js');

const get_invert_auction = async () => {
  try {
    const invert_auctions = await Invert_auction.findAll({
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
          attributes: ['user_id', 'favorites']
        },
        {
          model: Auction_bid // Include the Auction_bid model here
        }
      ]
    });

    const formattedAuctions = await Promise.all(
      invert_auctions.map(async auction => {
        const {
          id,
          desired_price,
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
          target_quantity,
          invert,
          status,
          type,
          subCategory,
          Auction_bids // Access the associated Auction_bids here
        } = auction;

        const timer = await handle_status(id, status, type, close_date);

        const formattedAuctionBids = Auction_bids.map(bid => ({
          bid_id: bid.id,
          proposed_price: bid.proposed_price,
          proposed_amount: bid.proposed_amount,
          target_accumulated: bid.target_accumulated,
          UserId: bid.user_id,
        }));
        return {
          id,
          desired_price,
          close_date,
          product,
          user,
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
          category: product.Sub_category.CategoryId,
          target_quantity,
          invert,
          auction_bids: formattedAuctionBids,
          timer
        };
      })
    );
    return formattedAuctions;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get_invert_auction
};