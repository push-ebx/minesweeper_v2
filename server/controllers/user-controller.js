const userService = require('../service/user-service');
// const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async test(req, res, next) {
    try {

      return res.json('ok');
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    const id_vk = req.payload

    try {
      const user = await userService.getUser(id_vk);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();