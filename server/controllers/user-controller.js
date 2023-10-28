const userService = require('../service/user-service');

class UserController {
  async getUser(req, res, next) {
    const id_vk = req.payload

    try {
      const user = await userService.getUser(id_vk);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateBalance(req, res, next) {
    const {id_vk} = req.query

    try {
      await userService.updateBalance(id_vk);
      return res.json('Balance has been updated');
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

  async withdraw(req, res, next) {
    const id_vk = req.payload

    try {
      const result = await userService.withdraw(id_vk);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();