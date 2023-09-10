const { User_admin } = require('../../db.js');

// Define la función que devuelve una promesa con la lista de usuarios administradores
const getUsersAdmin = () => {
    return User_admin.findAll(); 
};

module.exports = {
    getUsersAdmin,
};
