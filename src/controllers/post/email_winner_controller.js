const nodemailer = require('nodemailer');
const { Auction, User } = require('../../db.js')

const winnerEmail = async (user_id, auc_id, value) => {
    // const user = await userById(user_id);
    const user = await User.findByPk(user_id)
    const recipientEmail = user.email
    // const auction = await get_auction_by_id(auc_id)
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
        text: 'Esta es una notificacion estandar de los ganadores',
        html: `
            <h1>Ganador de la subasta</h1>
            <p>Felicidades estimado cliente! Usted resulto ganador de la subasta del siguiente producto: <strong>${auction.product_name}</strong>.El monto a pagar es de <strong>$ ${value}</strong> COP. En las proximas horas nos pondremos en contacto con usted. De no recibir respuesta de nuestra parte, o en caso de que haya algun problema, puede comunicarse con nosotros por la siguiente direccion: <a href="mailto:selproit@gmail.com">selproit@gmail.com</a>.</p>
            <p></p>
            <p>Muchisimas gracias por su compra!</p>
            <p>SELPRO Soluciones</p>
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
    winnerEmail,
};
