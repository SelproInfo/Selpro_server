const nodemailer = require('nodemailer');
const { Auction } = require('../../db.js');
const { userById } = require('../get/get_user_by_id.js');

const winEmail = async (user_id, auc_id) => {
    const user = await userById(user_id);
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
        to: 'selproit@gmail.com',
        subject: 'Notificación de Subasta',
        text: 'Esta es una notificacion estandar de los ganadores',
        html: `
            <h1>Ganador de la subasta</h1>
            <p>La subasta en cuestion es en la cual se subastó el siguiente producto: <strong>${auction.product_name}</strong>, de id: <strong>${auction.id}</strong>. El ganador fue el usuario <strong>${user.user_name}</strong>. Favor de ponerse en contacto con el cliente por la siguiente direccion de email: <a href="mailto:${user.email}">${user.email}</a>.</p>`,
    };


    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    winEmail,
};
