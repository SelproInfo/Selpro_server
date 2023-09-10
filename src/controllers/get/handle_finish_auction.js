const { User, Invert_auction, Auction_bid } = require('../../db.js');
const { winEmail } = require('../post/email_winner_auction_selpro.js');
const { winInvEmail } = require('../post/email_inv_auc_win_selpro.js');
const { winnerEmail } = require('../post/email_winner_controller.js');

const handle_finish_auction = async (auction_id, type) => {

  if (type === "AU") {

    const bids = await Auction_bid.findAll({
      where: {
        AuctionId: auction_id
      }
    });

    const maxBid = bids.reduce((max, bid) => {
      if (bid.proposed_price > max.value) {
        return {
          value: bid.proposed_price,
          user: bid.UserId
        };
      } else {
        return max;
      }
    }, { value: 0, user: null });

    await winnerEmail(maxBid.user, auction_id, maxBid.value)
    await winEmail(maxBid.user, auction_id)

    return maxBid;
  }

  if (type === "IA") {

    const bids = await Auction_bid.findAll({
      where: {
        InvertAuctionId: auction_id
      }
    });
    const invert = await Invert_auction.findByPk(auction_id);
    const { target_quantity } = invert;

    bids.sort((a, b) => a.proposed_price - b.proposed_price);
    const winners = [];
    let currentQuantity = 0;

    for (const bid of bids) {
      if (currentQuantity < target_quantity) {
        const remainingQuantity = target_quantity - currentQuantity;
        if (bid.proposed_amount <= remainingQuantity) {

          winners.push({
            user: bid.UserId,
            amount: bid.proposed_amount,
            price: bid.proposed_price
          });
          currentQuantity += bid.proposed_amount;
        } else {

          winners.push({
            user: bid.UserId,
            amount: remainingQuantity,
            price: bid.proposed_price
          });
          currentQuantity = target_quantity;
        }
      } else {

        break;
      }

      return winners;
    }

    if (currentQuantity === target_quantity) {

      winInvEmail(winners, auction_id);
      // Envía el correo electrónico
      // para los ganadores
      // winners contiene la lista de ganadores con sus cantidades y precios
      // { //Asi estan definidos los ganadores el el array winners
      //   user: '3d2f8589-138d-4a9a-ba05-00633d3fe795',
      //   amount: 200,
      //   price: 900
      // }
      // !EMAIL
    }


  }

};

// handle_finish_auction("1ccbfac8-d658-4dc1-8145-7aac0bab85ae","IA");
// handle_finish_auction("9ec92f3b-72ba-40ea-906f-9ec95799e7db", "AU");

module.exports = {
  handle_finish_auction
};
