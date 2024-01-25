const express = require('express');
const { StockController } = require('../../controllers');
const router = express.Router();

// top 10 stocks
router.get('/topten', StockController.getTopTen);

router.get('/:name', StockController.getByName);

router.get('/history/:id', StockController.getHistory);

module.exports = router;