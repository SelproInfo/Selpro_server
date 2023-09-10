const { Invert_auction, Product } = require('../../db.js');
const { handle_status } = require('../get/handle_status.js');
const schedule = require('node-schedule');
const { invert_activate } = require('../../utils/invert_timer.js');

const create_invert_auction = async (auctionArray) => {
    try {
        const productIds = auctionArray.map(auction => auction.product_id);

        const products = await Product.findAll({
            where: {
                id: productIds
            }
        });
        const createdAuctions = [];

        for (let i = 0; i < auctionArray.length; i++) {
            const auction = auctionArray[i];
            const product = products.find(p => p.id === auction.product_id);
            if (!product) {
                throw new Error('Producto no encontrado.');
            }

            
            const { name, image, brand, description, datasheet, SubCategoryId } = product;
            const new_auction = await Invert_auction.create({
                image: image,
                product_name: name,
                brand: brand,
                description: description,
                datasheet: datasheet,
                target_quantity: auction.target_quantity,
                close_date: auction.close_date,
                desired_price: auction.desired_price,
                invert: true,
                subCategory: SubCategoryId,
                type: 'IA',
                ProductId: product.id
            });
            createdAuctions.push(new_auction);

            handle_status(new_auction.id, new_auction.status, 'IA', new_auction.close_date);
        
            const date = new_auction.close_date;

            const scheduler = schedule.scheduleJob(date, async () => {
            
                const changeStatus = await invert_activate(new_auction.id, "Terminada", new_auction.type);
               
                const {id, status, type} = changeStatus
            
                handle_status(id, status, type);

                scheduler.cancel();
            });
        }

        return createdAuctions;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    create_invert_auction
};