const nodemailer = require('nodemailer');
const { Invert_auction } = require('../../db.js');
const { userById } = require('../get/get_user_by_id.js');

const winInvEmail = async (users_list, auction_id) => {
    const auction = await Invert_auction.findByPk(auction_id)
    let userArray = []
    let userObject = {}
    for (let i = 0; i < users_list; i++) {
        let user = await userById(users_list[i].user)
        userObject = { name: user.user_name, email: user.email, ammount: users_list[i].amount, price: users_list[i].price }
        userArray = [...userArray, userObject]
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'selpro.informacion@gmail.com',
            pass: 'vldobrtpfiygddwg',
        },
    });

    const userHtmlList = userArray.map((user, index) => `
        <p><strong>Usuario ${index + 1}:</strong></p>
        <ul>
            <li><strong>Nombre de Usuario:</strong> ${user.name}</li>
            <li><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></li>
            <li><strong>Cantidad:</strong> ${user.ammount}</li>
            <li><strong>Precio:</strong> ${user.price}</li>
        </ul>
    `).join('');

    const mailOptions = {
        from: 'selpro.informacion@gmail.com',
        to: 'selproit@gmail.com',
        subject: 'Notificación de ganadores',
        text: `Este es un mail estandar de respuesta de los ganadores de la subasta inversa`,
        html: `
        <h1>La siguiente es la lista de ganadores de la subasta inversa del producto: ${auction.product_name}</h1>
        ${userHtmlList}
        <p>Cada uno de los usuarios debe ser contactado de manera particular para arreglar los terminos de la venta en cuestion.</p>
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
    winInvEmail,
};
