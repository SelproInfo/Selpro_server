const { post_category_handler } = require("../handlers/post/post_category_handler.js");
const { post_subCategoty_handler } = require("../handlers/post/post_sub_cat_handler.js");
const { createdProd } = require('../handlers/post/post_product_handler.js');
const { toPostUser } = require('../handlers/post/post_user_handler.js');
const { createUserAdmin } = require('../handlers/post/post_admin_handler.js')
const { postAuction } = require("../handlers/post/post_bid_handler.js");
const { post_auction_handler } = require("../handlers/post/post_auction_handler.js");
const { post_invert_auction_handler } = require("../handlers/post/post_inv_auction_handler.js");
const { emailSend } = require("../handlers/post/email_service_handler.js");
const { mercado_pago_handler } = require("../handlers/post/mercado_pago_handler.js");
const { weebhook_handler } = require("../handlers/post/mercado_pago_webhook_handler.js");
const { toPostPreUser } = require("../handlers/post/post_pre_user_handler.js");
const { emailNotif } = require("../handlers/post/notif_email_handler.js");
const { emailHelp } = require("../handlers/post/help_email.js");
const { handler_favorites } = require("../handlers/post/handler_favorites.js");
const { emailInvNotif } = require("../handlers/post/email_notif_inv_handler.js");

const postRoutes = require('express').Router()

postRoutes.post("/category", post_category_handler);
postRoutes.post("/subcategory", post_subCategoty_handler);
postRoutes.post('/product', createdProd);
postRoutes.post('/admin', createUserAdmin)
postRoutes.post('/user', toPostUser);
postRoutes.post('/user/favorites/:user_id', handler_favorites);
postRoutes.post('/preUser', toPostPreUser);
postRoutes.post('/bid', postAuction);
postRoutes.post("/auction", post_auction_handler)
postRoutes.post("/invertAuction", post_invert_auction_handler)
postRoutes.post("/email", emailSend)
postRoutes.post('/notif', emailNotif)
postRoutes.post('/help', emailHelp)
postRoutes.post("/payment", mercado_pago_handler)
postRoutes.post("/webhook", weebhook_handler)
postRoutes.post('/invNotif', emailInvNotif)


module.exports = postRoutes