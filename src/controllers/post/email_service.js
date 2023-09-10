const nodemailer = require('nodemailer');
const { User } = require('../../db.js')

const getUserEmail = async (userId) => {

    const user = await User.findOne({ where: { id: userId } });
    if(!!user) return user.email;
};

const sendEmail = async (userId) => {
    const recipientEmail = await getUserEmail(userId);

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
        subject: 'Bienvenido!',
        text: 'Su cuenta ha sido creada exitosamente!.',
        html: '<h1>Le damos la bienvenida a SELPRO Soluciones, esperamos verlo con nosotros y que crezcamos juntos!</h1>',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    getUserEmail
};
