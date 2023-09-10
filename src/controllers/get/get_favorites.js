const { User } = require("../../db.js");

const get_favorites = async (user_id) => {

  const user = await User.findByPk(user_id);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const favorites = user.favorites;

  return favorites;
};

module.exports = {
  get_favorites
};
