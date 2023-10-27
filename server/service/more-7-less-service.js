const ApiError = require('../exceptions/api-error');
const userService = require('../service/user-service');
const {MD5, randomString} = require("../utils");

const getRandomInt = max => Math.floor(Math.random() * max) + 1;

class more7LessService {
  history = [[1, 1], [2,4], [5,2], [6,3], [6,6], [1, 1], [2,4], [5,2], [6,3], [6,6], [1, 1], [2,4], [5,2], [6,3]];
  io;
  game = {
    bets_by_type: {more: [], equal: [], less: []},
    bets: [],
    lost_time: -1,
    hash: "",
    key: "",
    dices: [],
  };
  coefficients = {more: 1.9, less: 1.9, equal: 5.8};

  stopGame() {
    this.io.emit('stop game m7l', {dices: this.game.dices, key: this.game.key})
    const sum_dices = this.game.dices[0] + this.game.dices[1]
    const win_type = sum_dices > 7 ? 'more' : (sum_dices < 7 ? 'less' : 'equal')
    this.history.unshift([this.game.dices[0], this.game.dices[1]])

    this.game.bets_by_type[win_type].map(async bet => {
      const user = await userService.getUser(bet.id_vk)
      await userService.setBalance(bet.id_vk, user.balance + bet.bet * this.coefficients[win_type])
    })

    setTimeout(() => {
      this.game = {
        bets_by_type: {more: [], equal: [], less: []},
        bets: [],
        lost_time: -1,
        hash: "",
        key: "",
        dices: []
      }
    }, 5000)
  }

  startGame() {
    this.game.lost_time = 10;
    this.game.dices = [getRandomInt(6), getRandomInt(6)];
    this.game.key = this.game.dices[0] + this.game.dices[1] + '|' + randomString(16);
    this.game.hash = MD5(this.game.key).toString();

    this.io.emit('start game m7l', {hash: this.game.hash});

    const timer = setInterval(() => {
      this.io.emit('lost time m7l', {lost_time: this.game.lost_time--})
      if (this.game.lost_time < 0) {
        clearInterval(timer)
        this.stopGame()
      }
    }, 1000)
  }

  async newBet(id_vk, bet, type_bet) {
    if (!this.game.lost_time) return 'Окончание раунда...'
    if (this.game.bets.find(bet => bet.id_vk === id_vk)) return 'Ты уже поставил!'
    if (bet <= 0) return 'Ставка меньше или равна нулю!'
    if (!isFinite(bet)) return 'Некорректная ставка!'

    const user = await userService.getUser(id_vk)
    if (user.balance < bet) return 'Ставка больше баланса!'

    this.game.bets_by_type[type_bet].push({id_vk, bet})
    const new_bet = {
      id_vk,
      bet,
      type_bet,
      avatar_url: user.avatar_url,
      first_name: user.first_name,
      last_name: user.last_name
    };
    this.game.bets.push(new_bet)

    await this.io.emit('new bet m7l', new_bet)
    await userService.setBalance(id_vk, user.balance - bet)

    !this.game.dices.length && this.startGame()
    return 'ok'
  }

  async getBank() {
    return this.game.bets
  }

  async getHistory() {
    return this.history.slice(0, 20)
  }
}

module.exports = new more7LessService();