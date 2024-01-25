const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  turnover: {
    type: Number,
    required: true,
  },
  history: [
    {
      date: {
        type: String,
        required: true,
      },
      open: {
        type: String,
      },
      high: {
        type: String,
      },
      low: {
        type: String,
      },
      close: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('Stock', stockSchema);
