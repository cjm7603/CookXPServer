const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
