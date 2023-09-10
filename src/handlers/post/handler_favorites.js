const { post_favorites } = require("../../controllers/post/favorites_controller.js");

const handler_favorites = async (req, res) => {
    
    const {user_id} = req.params;

    const {auction_id, isFavorite} = req.body;
    try {

        if(!user_id || !auction_id) return res.status(400).json("Falta data.");
    
        const newFavorites = await post_favorites(auction_id, isFavorite, user_id);
        
        if(!newFavorites){
            return res.status(404).json({ message: error.message });
        }

        return res.status(200).json({message: "Los favoritos se han actualizado correctamente.", data: newFavorites});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

module.exports = {
    handler_favorites
}