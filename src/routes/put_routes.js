const { put_activate_handler } = require('../handlers/put/put_activate_handler.js')
const { put_auc_handler } = require('../handlers/put/put_auction_handler.js')
const { put_inv_auc_handler } = require('../handlers/put/put_inv_auction_handler.js')
const { put_prod_handler } = require('../handlers/put/put_prod_handler.js')
const { put_user_handler } = require('../handlers/put/put_user_handler.js')


const putRoutes = require('express').Router()

putRoutes.put('/product/:id', put_prod_handler)
putRoutes.put('/auction/:id', put_auc_handler)
putRoutes.put('/invertAuction/:id', put_inv_auc_handler)
putRoutes.put('/user/:id', put_user_handler)
putRoutes.put('/admin/activate', put_activate_handler)

module.exports = putRoutes