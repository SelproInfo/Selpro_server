const { sendEmail } = require("../../controllers/post/email_service.js")


const emailSend = async (req, res) => {
    const { userId } = req.body
    try {
        await sendEmail(userId)
        res.send('Email enviado exitosamente')
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = { emailSend }