const express = require('express');
const { FavController } = require('../../controllers');
const router = express.Router();

router.post('/', FavController.addToFav);

router.get('/', FavController.getAllFav);

router.delete('/:id', FavController.removeStock);

module.exports = router;