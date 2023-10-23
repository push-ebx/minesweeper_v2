const ApiError = require('../exceptions/api-error');
const UserSchema = require("../models/User");

class UserService {
  io;
  users;
  socket;
  async createUser(body) {
    const count = await UserSchema.countDocuments();
    const {id: id_vk, first_name, last_name, photo_100: avatar_url} = body

    const user = new UserSchema({
      id: count + 1,
      id_vk,
      first_name,
      last_name,
      avatar_url,
      balance: 0,
      all_coin_win: 0,
      all_games: 0,
      is_online: true
    });
    user.save().then(() => console.log(`User successfully registered with id: ${count + 1}`));
    return user
  }

  async getUser(id_vk) {
    return UserSchema.findOne({id_vk})
  }

  async updateBalance(id_vk) {
    const socket_id = Object.keys(this.users).find(key => this.users[key] === +id_vk)
    this.socket.to(socket_id).emit('update balance')
    return UserSchema.findOne({id_vk})
  }

  async setBalance(id_vk, balance) {
    return UserSchema.updateOne({id_vk}, {
      balance
    })
  }

  async setOnlineStatus(id_vk, status) {
    await UserSchema.updateOne({ id_vk }, {
      is_online: status
    });
  }
}

module.exports = new UserService();