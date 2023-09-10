const { Router } = require('express');
const getRoutes = require('./get_routes');
const postRoutes = require('./post_routes');
const deleteRoutes = require('./delete_routes');
const putRoutes = require('./put_routes');
const adminRoutes = require('./admin_routes');



const router = Router();

router.use('/', getRoutes)
router.use('/create', postRoutes)
router.use('/delete', deleteRoutes)
router.use('/change', putRoutes)
router.use('/admin', adminRoutes)


module.exports = router;
