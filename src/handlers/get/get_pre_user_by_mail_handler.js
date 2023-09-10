const { get_preuserByMail } = require('../../controllers/get/get_pre_user_by_mail_controller');

const get_PreUserByMail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json("Falta data.");

        const response = await get_preuserByMail(email);
        if (!response) return res.status(404).json(`Hubo un problema al adquirir al usuario: ${email}`);
        
        return res.status(200).json({
            message: "Adquisición de datos exitosa",
            data: response
        });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = { get_PreUserByMail };
