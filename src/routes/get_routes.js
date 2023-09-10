const { toCategory } = require('../handlers/get/get_category_handler.js');
const { toSubCategory } = require('../handlers/get/get_sub_category_handler.js');
const { getProdHandler } = require('../handlers/get/get_products_handler.js');
const { getAllUsers } = require('../handlers/get/get_user_handler.js');
const { getAllAuctionBids } = require('../handlers/get/get_auction_bid_handler.js');
const { getUserAdmin } = require('../handlers/get/get_user_admin.js');
const { get_UserByName } = require('../handlers/get/get_user_by_user_name_handler.js');
const { get_all_auctions_handler } = require("../handlers/get/get_all_auctions_handler.js");
const { get_invertAuction_handler } = require("../handlers/get/get_invertAuction.handler.js");
const { get_auction_handler } = require("../handlers/get/get_auction_handler.js");
const { get_AuctionById_handler } = require("../handlers/get/get_auction_by_id_handler.js");
const { get_invertAuctionById_handler } = require("../handlers/get/get_invert_auction_by_id_handler.js");
const { PDFgenerate } = require('../handlers/get/generate_pdf_handler.js');
const { get_PreUserByMail } = require('../handlers/get/get_pre_user_by_mail_handler.js');
const { getUserById } = require('../handlers/get/get_user_by_id_handler.js');
const { get_favorites_handler } = require('../handlers/get/get_favorites_handler.js');

const getRoutes = require('express').Router()

getRoutes.get('/category', toCategory);
getRoutes.get('/subcategory', toSubCategory);
getRoutes.get('/product', getProdHandler);
getRoutes.get('/allUsers', getAllUsers);
getRoutes.get('/user', get_UserByName);
getRoutes.get('/user/:user_id', getUserById);
getRoutes.get('/user/favorites/:user_id', get_favorites_handler);
getRoutes.get('/preuser', get_PreUserByMail);
getRoutes.get('/bid', getAllAuctionBids);
getRoutes.get('/admins', getUserAdmin);
getRoutes.get("/allAuctions", get_all_auctions_handler)
getRoutes.get("/invertAuction", get_invertAuction_handler)
getRoutes.get("/auction", get_auction_handler)
getRoutes.get("/auction/:auction_id", get_AuctionById_handler)
getRoutes.get("/invertAuction/:invertAuction_id", get_invertAuctionById_handler)
getRoutes.get("/file", PDFgenerate)

module.exports = getRoutes