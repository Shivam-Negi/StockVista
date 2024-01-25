const express = require('express');
const { FavController } = require('../../controllers');
const router = express.Router();

router.post('/', FavController.addToFav);

router.get('/', FavController.getAllFav);

module.exports = router;