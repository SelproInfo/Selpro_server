require('dotenv').config();
const { Auction, Product, Transaction } = require('../../db.js');
const mercadopago = require("mercadopago")
const { MERCADOPAGO_KEY } = process.env;

const mercado_pago = async (auction) => {
    mercadopago.configure({ access_token: "TEST-6508841798496540-082620-75c515c0d097a7644d34f05fc0d0b7f0-1462578434" })
    const { id, product, sale_price } = auction
    const isAuction = Auction.findByPk(id)
    const existProduct = Product.findByPk(product.id)

    if (!isAuction || !existProduct) throw new Error("Subasta o producto no existen")

    if (isAuction) {
        const { product_name, description, image } = auction;
        const payment = await mercadopago.preferences.create({
            items: [
                {
                    id: id,
                    title: product_name,
                    description: description,
                    unit_price: sale_price, //precio del comprar ya
                    currency_id: "ARS",
                    picture_url: image,
                    quantity: 1,
                    deferred_payment: false,
                }
            ],
            back_urls: {
                success: "https://selpro-soluciones.netlify.app/",
                failure: "",
                pending: "",
            },
            notification_url: "https://selpro-it.onrender.com/create/webhook",
            metadata: {
                //user_id: user_id, // Puedes almacenar el user_id en el campo metadata
            },
        })

        const url = payment.body.init_point
        return url
    }

};

const receiveWebhook = async (payment) => {
    if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"])
        const { body } = data
        const transaction = await Transaction.create({
            id: body.id,
            date_created: body.date_created,
            date_approved: body.date_approved,
            description: body.description,
            status: body.status,
            payment_type_id: body.payment_type_id,
            currency_id: body.currency_id,
            transaction_amount: body.transaction_amount,
            payment_method_id: body.payment_method_id,
            card_last_four_digits: body.card_last_four_digits,
            payer_email: body.payer.email,
        })

        //Transaction.setUser()
        return transaction
    }
}

module.exports = {
    mercado_pago,
    receiveWebhook,
};
