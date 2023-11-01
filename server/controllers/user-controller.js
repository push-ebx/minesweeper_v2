const userService = require('../service/user-service');
const {logger} = require("../utils");

class UserController {
  async getUser(req, res, next) {
    const id_vk = req.payload

    try {
      const user = await userService.getUser(id_vk);
      return res.json(user);
    } catch (e) {
      logger.info(`getUser(): ${e}`);
      next(e);
    }
  }

  async updateBalance(req, res, next) {
    const {id_vk} = req.query

    try {
      await userService.updateBalance(id_vk);
      return res.json('Balance has been updated');
    } catch (e) {
      logger.info(`updateBalance(): ${e}`);
      next(e);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      return res.json(user);
    } catch (e) {
      logger.info(`createUser(): ${e}`);
      next(e);
    }
  }

  async withdraw(req, res, next) {
    const id_vk = req.payload

    try {
      const result = await userService.withdraw(id_vk);
      return res.json(result);
    } catch (e) {
      logger.info(`withdraw(): ${e}`);
      next(e);
    }
  }

  async getTop(req, res, next) {
    try {
      const top = await userService.getTop();
      return res.json(top);
    } catch (e) {
      logger.info(`updateBalance(): ${e}`);
      next(e);
    }
  }
}

module.exports = new UserController();