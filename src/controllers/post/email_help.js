const nodemailer = require('nodemailer');
const { uploadFile } = require('../../utils/PDFCloudinaryConfig.js');

const helpEmail = async (email, help) => {
    const filesArray = help.files
    let files = []
    for (let i = 0; i < filesArray.length; i++) {
        const arch = await uploadFile(filesArray[i])
        files = [...files, arch]
    }
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
        subject: 'Notificación de ayuda',
        text: `Este es un mail de ayuda.`,
        html: `
        <h1>Email de ayuda</h1>
        <p>De parte del usuario de dirección de email: <a href="mailto:${email}">${email}</a>.</p>
        <p>Se detalla la siguiente descripción de ayuda:</p>
        <p>${help.detail}</p>
        <p>A continuación se adjuntan los archivos pertinentes:</p>
        <ul>
            ${files.map((file, index) => `<li><a href="${file}">${file}</a></li>`).join('')}
        </ul>
        <p>Para descargar los archivos, haga clic con el botón derecho en el enlace y seleccione "Guardar enlace como..." o "Descargar enlace como..." según su navegador.</p>
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
    helpEmail,
};
