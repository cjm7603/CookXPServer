const mongoose = require('mongoose');

const RecipeCompletionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  completion_date: {
    type: Date,
    default: Date.now
  },
  is_completed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RecipeCompletion', RecipeCompletionSchema);
