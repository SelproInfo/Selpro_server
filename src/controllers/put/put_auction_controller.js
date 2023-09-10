const { Auction } = require('../../db.js');

const put_auc_controller = async (
  id,
  status,
  close_date,
  base_price,
  authorize,
  deleteFlag
) => {
  const auction = await Auction.findByPk(id);
  if (!auction) {
    throw new Error('Subasta no encontrada.');
  }

  const changed_auction = {};

  if(status !== undefined){
    changed_auction.status = status;
  }
  if (base_price !== undefined) {
    changed_auction.base_price = base_price;
  }
  if (close_date !== undefined) {
    const parsedCloseDate = new Date(close_date);
    if (isNaN(parsedCloseDate)) {
      throw new Error('Formato de fecha no válido para la fecha de cierre.');
    }
    changed_auction.close_date = parsedCloseDate;
  }
  if (deleteFlag !== undefined) {
    changed_auction.deleteFlag = deleteFlag;
  }
  if (authorize !== undefined) {
    changed_auction.authorize = authorize;
  }

  if (Object.keys(changed_auction).length === 0) {
    throw new Error('No se proporcionaron campos válidos para la actualización.');
  }

  const [updatedRows] = await Auction.update(changed_auction, {
    where: { id }
  });

  if (updatedRows > 0) {
    await auction.reload();
    return auction;
  }

  throw new Error('No se puede actualizar la subasta.');
};

module.exports = {
  put_auc_controller,
};
