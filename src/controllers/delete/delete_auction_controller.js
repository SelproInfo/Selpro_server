const { Auction } = require('../../db.js');

const delete_auction = async (id) => {

    await Auction.destroy(
        {
            where: {
                id: id,
            }
        }
    );

    return 'Soft-delete successfull'

}

module.exports = {
    delete_auction,
}
