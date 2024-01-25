const express = require('express');
const router = express.Router();

const stockRoutes = require('./stock-routes');
const favRoutes = require('./fav-routes');

router.use('/stock', stockRoutes);
router.use('/fav', favRoutes);

module.exports = router;