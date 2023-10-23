const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  id_vk: {type: Number, unique: true, required: true},
  id: {type: Number, unique: true, required: true},
  first_name: {type: String, unique: false, required: true},
  last_name: {type: String, unique: false, required: true},
  avatar_url: {type: String, unique: false, required: true},
  balance: {type: Number, required: true},
  all_coin_win: {type: Number, required: true},
  all_games: {type: Number, required: true},
  is_online: {type: Boolean}
})

module.exports = model('User', UserSchema)