const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const FriendSchema = new mongoose.Schema({
  //friend id not necessary as mongo automatically generates _id
  username: {type:String, required:true},
  friend_username: {type:String, required:true},
  friendship_date: {type:Date, required: true, default:Date.now}
});

FriendSchema.plugin(AutoIncrement, { inc_field: 'friend_id' });
module.exports = mongoose.model('Friend', FriendSchema);