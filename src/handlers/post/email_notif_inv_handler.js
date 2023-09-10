const { notifEmail } = require("../../controllers/post/notification_email")


const emailInvNotif = async (req, res) => {
    const { name, auction_id } = req.body
    try {
        await notifEmail(name, auction_id)
        res.send('Email enviado exitosamente!')
    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = { emailInvNotif }