const nodemailer = require('nodemailer');
const { User } = require('../../db.js')

const emailClient = async (userId) => {
    const user = await User.findByPk(userId);
    const recipientEmail = user.email;

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
        subject: 'Aviso',
        text: 'Ahora eres cliente!',
        html: `
        <h1>Buenos dias, estimado cliente!</h1>
        <p>Queremos informarle que ha sido convertido en cliente, esperamos tenga muchas ofertas exitosas y este satisfecho con nuestros productos de calidad. Le deseamos el mayor de los exitos!</p>
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
    emailClient
};
