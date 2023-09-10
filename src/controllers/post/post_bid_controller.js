const { Auction_bid, Auction, Invert_auction, User } = require("../../db.js");

const createAuctionBid = async (
  auction_id,
  proposed_price,
  proposed_amount,
  invert,
  user_id
) => {
  if (!auction_id || !proposed_price || !user_id) {
    throw new Error("Faltan completar campos.");
  }

  const user = await User.findByPk(user_id);
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  let { interaction_history } = user;

  if (!interaction_history.includes(auction_id)) {
    const newBids = [...interaction_history, auction_id];
    const update = {
      interaction_history: newBids,
    };
    await User.update(update, {
      where: {
        id: user_id
      },
    });
  }
  if (invert) {
    if (!proposed_amount) {
      throw new Error("Faltan completar campos.");
    }

    const invertAuction = await Invert_auction.findByPk(auction_id);

    if (!invertAuction) {
      throw new Error(`No se encontró esa subasta inversa.`);
    }

    const bids = await Auction_bid.findAll({
      where: { InvertAuctionId: invertAuction.id },
    });

    let totalTargetAccumulated = 0;

    // Calcular la suma de los proposed_amount de las pujas existentes
    for (const bid of bids) {
      totalTargetAccumulated += bid.proposed_amount;
    }

    // Sumar el nuevo proposed_amount al total
    totalTargetAccumulated += proposed_amount;

    if (proposed_price <= 0) {
      throw new Error(`La puja no puede ser 0 o un número negativo.`);
    }
    if (proposed_amount > invertAuction.target_quantity) {
      throw new Error(
        `La cantidad de productos ofrecidos no pueden ser mayor al la cantidad de productos solicitados. La cantidad de los meta es: ${invertAuction.target_quantity}`
      );
    }

    const newAuctionBid = await Auction_bid.create({
      proposed_price,
      proposed_amount,
      target_accumulated: totalTargetAccumulated,
      UserId: user_id,
      InvertAuctionId: invertAuction.id, // Asignar la subasta inversa a la nueva puja
    });

    invertAuction.addAuction_bid(newAuctionBid);

    return newAuctionBid;
  } else {
    const auction = await Auction.findByPk(auction_id);

    if (!auction) {
      throw new Error(`No se encontró esa subasta.`);
    }

    const newAuctionBid = await Auction_bid.create({
      proposed_price,
      UserId: user_id,
      AuctionId: auction.id,
    });

    auction.addAuction_bid(newAuctionBid);

    return newAuctionBid;
  }
};

module.exports = {
  createAuctionBid,
};
