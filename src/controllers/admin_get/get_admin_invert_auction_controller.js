const { Invert_auction, Product, Category, Sub_category, User, Auction_bid } = require('../../db.js'); // Asegúrate de importar sequelize
// const { handle_date } = require('./handle_date.js');

const get_admin_invert_auction = async () => {
    try {
        const invert_auctions = await Invert_auction.findAll({
            include: [
                {
                    model: Product,
                    include: [
                        { model: Sub_category, include: Category }
                    ],
                    paranoid: false
                },
                {
                    model: User,
                    attributes: ['user_id', 'favorites'],
                    paranoid: false
                },
                {
                    model: Auction_bid, // Include the Auction_bid model here
                    paranoid: false
                }
            ],
            paranoid: false
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
                    Auction_bids,
                    destroyTime,
                } = auction;

                const formattedAuctionBids = Auction_bids.map(bid => ({
                    bid_id: bid.id,
                    proposed_price: bid.proposed_price,
                    proposed_amount: bid.proposed_amount,
                    target_accumulated: bid.target_accumulated
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
                    destroyTime,
                };
            })
        );

        return formattedAuctions;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    get_admin_invert_auction
};
