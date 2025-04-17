const mongoose = require('mongoose');

const RecipeCompletionSchema = new mongoose.Schema({
    recipe_id: {type:Number, required:true},
    username: {type:String, required:true},
    is_completed: {type:Boolean, required:true},
    completion_date: {type:Date,required:false}
});

module.exports = mongoose.model('RecipeCompletion', RecipeCompletionSchema);