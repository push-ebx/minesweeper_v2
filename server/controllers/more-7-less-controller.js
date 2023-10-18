const more7LessService = require('../service/more-7-less-service');

class More7LessController {
  async newBet(req, res, next) {
    const id_vk = req.payload
    const {bet, type_bet} = req.body

    try {
      const result = await more7LessService.newBet(id_vk, bet, type_bet);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getBank(req, res, next) {
    try {
      const result = await more7LessService.getBank();
      console.log(result)
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new More7LessController();