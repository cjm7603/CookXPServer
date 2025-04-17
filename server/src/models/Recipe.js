const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    //anything besides these values can be obtained from the external API
    recipe_id: {type:Number, required:true, unique:true},
    difficulty_lvl: {type:Number, required:true},
    point_value: {type:Number, required:true}
});

module.exports = mongoose.model('Recipe', RecipeSchema);