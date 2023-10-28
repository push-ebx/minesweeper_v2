const more7LessService = require('../service/more-7-less-service');
const {logger} = require("../utils");

class More7LessController {
  async newBet(req, res, next) {
    const id_vk = req.payload
    const {bet, type_bet} = req.body

    try {
      const result = await more7LessService.newBet(id_vk, bet, type_bet);
      return res.json(result);
    } catch (e) {
      logger.info(`newBet(): ${e}`);
      next(e);
    }
  }

  async getBank(req, res, next) {
    try {
      const result = await more7LessService.getBank();
      return res.json(result);
    } catch (e) {
      logger.info(`getBank(): ${e}`);
      next(e);
    }
  }

  async getHistory(req, res, next) {
    try {
      const result = await more7LessService.getHistory();
      return res.json(result);
    } catch (e) {
      logger.info(`getHistory(): ${e}`);
      next(e);
    }
  }
}

module.exports = new More7LessController();