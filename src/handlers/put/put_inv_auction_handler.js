const {
  put_inv_auc_controller
} = require("../../controllers/put/put_inv_auction_controller.js");


const put_inv_auc_handler = async (req, res) => {
  const { id } = req.params;
  const {
    status,
    close_date,
    target_accumulated,
    desired_price,
    target_quantity,
    deleteFlag,
    authorize,
    sale_price
  } = req.body;
  try {
    const inv_auction = await put_inv_auc_controller(
      id,
      status,
      close_date,
      target_accumulated,
      desired_price,
      target_quantity,
      deleteFlag,
      authorize,
      sale_price
    );
    if (!inv_auction) res.json({ error: error.message });
    return res
      .status(200)
      .json(("Subasta inversa cambiada correctamente.", inv_auction));
  } catch (error) {
    res.json(({ error: error.message }, {}));
  }
};

module.exports = {
  put_inv_auc_handler
};
