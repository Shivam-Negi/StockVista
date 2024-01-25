const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
      },
});

module.exports = mongoose.model('Fav', favSchema);