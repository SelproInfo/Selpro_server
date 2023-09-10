const nodemailer = require('nodemailer');
const { get_usersByName } = require('../get/get_user_by_user_name_controller.js');
const { get_invertAuction_by_id } = require('../get/get_invert_auction_by_id_controller.js');
const {Auction} = require('../../db.js')

const notifInvEmail = async (name, auc_id) => {
    const user = await get_usersByName(name);
    const recipientEmail = user.email
    // const auction = await get_invertAuction_by_id(auc_id)
    const auction = await Auction.findByPk(auc_id)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'selpro.informacion@gmail.com',
            pass: 'vldobrtpfiygddwg',
        },
    });

    const mailOptions = {
        from: 'selpro.informacion@gmail.com',
        to: recipientEmail,
        subject: 'Notificación de Subasta',
        text: 'Esta es una notificacion estandar de la subasta inversa',
        html: `
            <h1>Buenos días, ${user.name}</h1>
            <p>Usted recibió esta notificación a pedido propio para conocer sobre la subasta de <strong>${auction.product_name}</strong>. La misma tiene un monto inicial de $ ${auction.base_price} COP y tiene fecha de cierre para el día ${auction.close_date}. Se espera vender un total de ${auction.target_quantity} unidades. Si desea conocer más sobre el producto a subastar o tiene consultas de otro tipo, por favor contáctese con <a href="mailto:selproit@gmail.com">selproit@gmail.com</a>.</p>
            <p>Con gusto, a su servicio.<br>SELPRO Soluciones.</p>
        `,
    };
    

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    notifInvEmail,
};
