const nodemailer = require('nodemailer');
const { User } = require('../../db.js')

const emailSupSelpro = async (userId, RUT, comCham, LI, comRef) => {
    const user = await User.findByPk(userId);

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
        subject: 'Aviso',
        text: 'Usuario quiere ser Proveedor',
        html: `
        <h1>Buenos dias</h1>
        <p>Se informa que el cliente de direccion de email<a href="mailto:${user.email}">${user.email}</a> ha enviado sus datos:</p>
        <ul>
        <li>Imagen de RUT: ${RUT}</li>
        <li>Camara de comercio: ${comCham}</li>
        <li>Identificación de representante legal: ${LI}</li>
        <li>Referencias comerciales: ${comRef}</li>
        </ul>
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
    emailSupSelpro
};
