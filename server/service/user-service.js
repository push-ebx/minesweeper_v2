const ApiError = require('../exceptions/api-error');
const UserSchema = require("../models/User");
const {send_message_vk} = require("../utils");

class UserService {
  io;
  users;
  socket;

  async createUser(body) {
    const count = await UserSchema.countDocuments();
    const {id: id_vk, first_name, last_name, photo_100: avatar_url} = body
    const user_candidate = await this.getUser(id_vk)

    if (user_candidate) return user_candidate

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
    // const socket_id = Object.keys(this.users).find(key => this.users[key] === +id_vk)
    this.socket.emit('update balance', {id_vk})
    return UserSchema.findOne({id_vk})
  }

  async setBalance(id_vk, balance) {
    return UserSchema.updateOne({id_vk}, {
      balance
    })
  }

  async setOnlineStatus(id_vk, status) {
    await UserSchema.updateOne({id_vk}, {
      is_online: status
    });
  }

  async withdraw(id_vk) {
    const user = await this.getUser(id_vk)

    if (user.balance > 0) {
      await send_message_vk(process.env.BOT_BANDIT_ID, `передать @id${id_vk} ${Math.floor(user.balance)}`,
                            process.env.BOT_TOKEN)
      await this.setBalance(id_vk, 0)
    }
    return 'error'
  }
}

module.exports = new UserService();