const mongoose = require('mongoose');
const {Schema, model} = mongoose;
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

const UserSchema = new Schema({
  id_vk: {type: String, unique: true, required: true},
  id: {type: Number, unique: true, required: true},
  first_name: {type: String, unique: false, required: true},
  last_name: {type: String, unique: false, required: true},
  avatar_url: {type: String, unique: false, required: true},
  balance: {type: Long, required: true},
  all_coin_win: {type: Long, required: true},
  all_coin_lose: {type: Long, required: true},
  all_games_win: {type: Number, required: true},
  all_games_lose: {type: Number, required: true},
  is_online: {type: Boolean}
})

module.exports = model('User', UserSchema)