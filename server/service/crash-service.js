const ApiError = require('../exceptions/api-error');
const userService = require('../service/user-service');
const {MD5, randomString, logger} = require("../utils");

const getRandomInt = max => Math.floor(Math.random() * max) + 1;

class CrashService {
  history = [1.1, 12.3, 100, 20.3, 1.3, 2.2, 20.3];
  io;
  game = {
    bets: [],
    lost_time: -1,
    hash: "",
    key: "",
    coefficient: -1,
    isGame: true,
    game_time: 0
  };

  stopGame() {
    this.game.isGame = false;
    logger.info(`CRASH | stopGame(): (game: ${JSON.stringify(this.game)})`);

    this.io.emit('stop game crash', {game_time: this.game.game_time, key: this.game.key});
    this.history.unshift(this.game.coefficient);

    // this.game.bets_by_type[win_type].map(async bet => { // winners
    //   const {balance, all_coin_win, all_coin_lose, all_games_win, all_games_lose} = await userService.getUser(bet.id_vk)
    //   const prize = bet.bet * this.coefficients[win_type]
    //   await userService.setBalance(bet.id_vk, balance + prize)
    //   await userService.setStatistics(bet.id_vk, all_coin_win + prize, all_coin_lose,
    //                       all_games_win + 1, all_games_lose)
    // })
    //
    // for (const [key, value] of Object.entries(this.game.bets_by_type)) {
    //   if (key !== win_type) {
    //     value.map(async bet => { // losers
    //       const {all_coin_win, all_coin_lose, all_games_win, all_games_lose} = await userService.getUser(bet.id_vk)
    //       await userService.setStatistics(bet.id_vk, all_coin_win, all_coin_lose + bet.bet,
    //         all_games_win, all_games_lose + 1)
    //     })
    //   }
    // }

    setTimeout(() => {
      this.game = {
        bets: [],
        lost_time: -1,
        hash: "",
        key: "",
        coefficient: -1,
        isGame: true,
        game_time: 0
      }
      logger.info(`CRASH | stopGame(): game is reset`);
    }, 5000)
  }

  startGame() {
    this.game.lost_time = 10;
    this.game.coefficient = getRandomInt(5);
    this.game.key = this.game.coefficient + '|' + randomString(16);
    this.game.hash = MD5(this.game.key).toString();

    this.io.emit('start game crash', {hash: this.game.hash});
    logger.info(`CRASH | startGame(): game is started ${JSON.stringify(this.game)}`);

    let game_timer;

    const before_timer = setInterval(() => {
      this.io.emit('lost time crash', {lost_time: this.game.lost_time--});
      if (this.game.lost_time < 0) {
        game_timer = setInterval(() => {
          this.game.game_time += 0.1;

          if (this.game.game_time > this.game.coefficient) {
            clearInterval(before_timer);
            this.stopGame();
            return;
          }

          this.io.emit('game time crash', {game_time: this.game.game_time});
          console.log(this.game.game_time);
        }, 100);

        clearInterval(before_timer);
      }
    }, 1000)
  }

  async newBet(id_vk, bet) {
    console.log('stavochka');

    if (!this.game.lost_time || !this.game.isGame) return 'Окончание раунда...'
    if (this.game.bets.find(bet => bet.id_vk === id_vk)) return 'Ты уже поставил!'
    if (bet <= 0) return 'Ставка меньше или равна нулю!'
    if (!isFinite(bet)) return 'Некорректная ставка!'

    const user = await userService.getUser(id_vk)
    logger.info(`Crash: newBet(): (user: ${JSON.stringify(user)}, bet: ${bet}`);

    if (user.balance < bet) return 'Ставка больше баланса!'

    const new_bet = {
      id_vk,
      bet,
      avatar_url: user.avatar_url,
      first_name: user.first_name,
      last_name: user.last_name
    };
    this.game.bets.push(new_bet)

    await this.io.emit('new bet crash', new_bet)
    await userService.setBalance(id_vk, user.balance - bet)

    this.game.coefficient === -1 && this.startGame()
    return 'ok'
  }

  // async getBank() {
  //   return this.game.bets
  // }
  //
  // async getHistory() {
  //   return this.history.slice(0, 20)
  // }
}

module.exports = new CrashService();