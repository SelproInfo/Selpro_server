const { postPreUser } = require('../../controllers/post/post_preUser_controller');
const { register } = require('../../controllers/get/auth_email_controller');

const toPostPreUser = async (req, res) => {
  try {
    const {email} = req.body;

    if(!email) throw new Error ("Falta data.");

    const registrationResult = await register(email);

    if (registrationResult) {
      return res.status(400).json(('Ese nombre de usuario ya está en uso.'));
    }

    const newPreUser = await postPreUser({
      email,
    });

    res.status(200).json(('El usuario ha sido creado correctamente.', newPreUser));
  } catch (error) {
    res.status(400).json((`Error creando ese pre usuario: ${error.message}`));
  }
};

module.exports = { toPostPreUser };
