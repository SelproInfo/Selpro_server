const { put_auc_controller } = require("../../controllers/put/put_auction_controller.js");

const put_auc_handler = async (req, res) => {
  const { id } = req.params;
  const { status,
    close_date,
    base_price,
    authorize,
    deleteFlag } = req.body;

  try {
    const auction = await put_auc_controller(status,
      close_date,
      base_price,
      authorize,
      deleteFlag);
      
    if (!auction) {
      return  res.status(400).json({ error: 'Subasta no encontrada.' });
    }
    return res.json({ message: 'La subasta se actualizó correctamente.', auction });
  } catch (error) {
    return res.json({ error: `Error actualizando la subasta: ${error.message}` });
  }
};

module.exports = {
  put_auc_handler
};
