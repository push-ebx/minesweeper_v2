const ApiError = require('../exceptions/api-error');
const UserSchema = require("../models/User");
const {send_message_vk, logger} = require("../utils");

class UserService {
  io;
  users;
  socket;

  async createUser(body) {
    try {
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
        all_coin_lose: 0,
        all_games_win: 0,
        all_games_lose: 0,
        is_online: true
      });
      await user.save().then(() => console.log(`User successfully registered with id: ${count + 1}`));
      return user;
    } catch (e) {
      console.log('Опять ошибка при регистрации!');
    }
  }

  async setStatistics(id_vk, all_coin_win, all_coin_lose, all_games_win, all_games_lose) {
    return UserSchema.updateOne({id_vk}, {
      all_coin_win, all_coin_lose, all_games_win, all_games_lose
    })
  }

  async getUser(id_vk) {
    try {
      const user = await UserSchema.findOne({id_vk})
      if (!user) return null
      return {
        ...Object.assign({}, user)._doc,
        balance: +user.balance,
        all_coin_win: +user.all_coin_win,
        all_coin_lose: +user.all_coin_lose
      }
    } catch (e) {
      console.log('aaaaaaaaaaa');
    }
  }

  async updateBalance(id_vk) {
    // const socket_id = Object.keys(this.users).find(key => this.users[key] === +id_vk)
    this.socket.emit('update balance', {id_vk}) // дэмн
    return UserSchema.findOne({id_vk})
  }

  async setBalance(id_vk, balance) {
    logger.info(`SetBalance(): (id_vk: ${id_vk}, balance: ${balance})`);
    return UserSchema.updateOne({id_vk}, {
      balance
    })
  }

  async setOnlineStatus(id_vk, status) {
    logger.info(`setOnlineStatus(): (id_vk: ${id_vk}, status: ${status})`);
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
      logger.info(`withdraw(): (id_vk: ${id_vk}, balance: ${user.balance}) -- completed`);
    }
    logger.error(`withdraw(): (id_vk: ${id_vk}, balance: ${user.balance})`);
    return 'error'
  }

  async getTop() {
    const users = await UserSchema.find().sort({all_coin_win: -1}).limit(50)

    return users.map(user => ({
      ...Object.assign({}, user)._doc,
      balance: +user.balance,
      all_coin_win: +user.all_coin_win,
      all_coin_lose: +user.all_coin_lose
    }))
  }
}

module.exports = new UserService();