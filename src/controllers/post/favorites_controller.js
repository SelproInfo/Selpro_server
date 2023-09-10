const { User } = require("../../db.js");

const post_favorites = async (auction_id, isFavorite, user_id) => {
  let user = await User.findOne({
    where: { id: user_id },
  });

  if (!user) {
    throw new Error("No se encontró ningún usuario con ese id.");
  }

  let { favorites } = user;

  if (!isFavorite) {
    favorites = favorites.filter((favorite) => favorite !== auction_id);
  }
  else if (isFavorite) {
    favorites = [...favorites, auction_id];
  };
  
  const update = {
    favorites: favorites
  };

  await User.update(update, { where: { id: user_id } });

  user = await User.findOne({
    where: { id: user_id },
  });

  return user;
};

module.exports = {
  post_favorites,
};
