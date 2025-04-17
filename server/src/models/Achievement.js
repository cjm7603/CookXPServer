const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    //achievementid unnecessary
    username: {type:String, required:true},
    name: {type:String, required:true},
    description: {type:String, required:false},
    //idk if points_required is necessary, will add later if needed
    earned_date: {type:Date,required:true, default:Date.now}
});

module.exports = mongoose.model('Achievement', AchievementSchema);