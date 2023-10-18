const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');

class UserController {
  async getUser(req, res, next) {
    console.log(req.payload)
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