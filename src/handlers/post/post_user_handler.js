const { postUser } = require('../../controllers/post/post_user_controller.js');
const { register } = require('../../controllers/get/auth_controller.js');

const toPostUser = async (req, res) => {
  try {
    const {
      name,
      num_ident,
      user_name,
      phone,
      email,
      adress,
      company_name,
      NIT,
      sector,
      CIIU,
      id_subcat,
    } = req.body;

    if(!name || !num_ident || !user_name || !phone || !email || !adress || !company_name || !NIT || !sector || !CIIU || !id_subcat) throw new Error ("Falta data.");

    const registrationResult = await register(user_name);

    if (registrationResult) {
      return res.status(400).json('Error en el registro de usuario.');
    }

    const newUser = await postUser({
      name,
      num_ident,
      user_name,
      phone,
      email,
      adress,
      company_name,
      NIT,
      sector,
      CIIU,
      id_subcat,
    });

    res.status(200).json(('User created successfully', newUser));
  } catch (error) {
    res.status(400).json((`Error creating user: ${error.message}`));
  }
};

module.exports = { toPostUser };
