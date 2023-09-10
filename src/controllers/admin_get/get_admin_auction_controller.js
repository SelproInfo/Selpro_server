const { Auction, Product, Category, Sub_category, User, Auction_bid } = require('../../db.js'); // Asegúrate de importar sequelize
// const { handle_status } = require('./handle_status.js');
// const { handle_date } = require('./handle_date.js');

const get_admin_auction = async () => {
    try {
        const auctions = await Auction.findAll({
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
                    attributes: ['user_id', 'favorites', 'created_history'],
                    paranoid: false
                },
                {
                    model: Auction_bid,
                    paranoid: false
                }
            ],
            paranoid: false
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
                    Auction_bids,
                    destroyTime,
                } = auction;

                const formattedAuctionBids = Auction_bids.map(bid => ({
                    bid_id: bid.id,
                    proposed_price: bid.proposed_price,
                    paranoid: false
                }));

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
    get_admin_auction
};
