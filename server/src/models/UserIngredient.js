const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RecipeCompletionSchema = new mongoose.Schema({
    user_ingredient_id: {type:Number, required:true, unique:true},
    username: {type:String, required:true},
    ingredient_name: {type:String, required: true},
    quantity: {type:Number, required: true},
    last_updated: {type:Date,required:true}
});

AchievementSchema.plugin(AutoIncrement, { inc_field: 'user_ingredient_id' });
module.exports = mongoose.model('RecipeCompletion', RecipeCompletionSchema);