const { Invert_auction } = require('../../db.js')

const put_inv_auc_controller = async (
  id,
  status,
  close_date,
  target_accumulated,
  desired_price,
  target_quantity,
  deleteFlag,
  authorize,
  sale_price
) => {
  const inv_auction = await Invert_auction.findOne({ where: { id: id } });
  if (!inv_auction) "Subasta inversa no encontrada.";

  const changed_inv_auction = {};

  if(status !== undefined){
    changed_inv_auction.status = status;
  }
  if (!!desired_price) {
    changed_inv_auction.desired_price = desired_price;
  }
  if (!!target_quantity) {
    changed_inv_auction.target_quantity = target_quantity;
  }
  if (!!target_accumulated) {
    changed_inv_auction.target_accumulated = target_accumulated;
  }
  if (close_date !== undefined) {
    const parsedCloseDate = new Date(close_date);
    if (isNaN(parsedCloseDate)) {
      throw new Error("Formato inválido ingresado para la fecha de cierre.");
    }
    changed_inv_auction.close_date = parsedCloseDate;
  }
  if (sale_price !== undefined) {
      changed_inv_auction.sale_price = sale_price;
  }
 if (deleteFlag !== undefined && deleteFlag !== null) {
    changed_inv_auction.deleteFlag = deleteFlag;
  }
  if (authorize !== undefined && authorize !== null) {
      changed_inv_auction.authorize = authorize;
  }

  const [updatedRows] = await Invert_auction.update(changed_inv_auction, {
    where: {
      id: id,
    },
  });

  if (updatedRows > 0) {
    await inv_auction.reload();
    return inv_auction;
  }
  throw new Error("No se pudo actualizar esa subasta inversa.");
};

module.exports = {
  put_inv_auc_controller
};
