const { User_admin } = require('../../db.js');

const postUserAdmin = async (newUserAdmin) => {
  const { role, email, name, phone } = newUserAdmin;
  const accessCondition = role === 'CEO' || role === 'Junior Developer';

  if (accessCondition) {
    try {
      const userAdmin = await User_admin.create({
        name,
        email,
        role,
        phone,
      });

      return userAdmin;
    } catch (error) {
      throw new Error('Se produjo un error creando el usuario de administrador.');
    }
  } else {
    throw new Error('Usted no tiene acceso para crear un usuario de administrador.');
  }
};

module.exports = postUserAdmin;
