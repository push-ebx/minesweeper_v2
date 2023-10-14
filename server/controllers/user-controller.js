const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async registration(req, res, next) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {first_name, last_name, username, email, sex, password} = req.body;
      const userData = await userService.registration(first_name, last_name, username, email, sex, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const {username, password} = req.body;

      const userData = await userService.login(username, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

//   async logout(req, res, next) {
//     try {
//       const {refreshToken} = req.cookies;
//       const token = await userService.logout(refreshToken);
//       res.clearCookie('refreshToken');
//       return res.json(token);
//     } catch (e) {
//       next(e);
//     }
//   }
//
//   async refresh(req, res, next) {
//     try {
//       const {refreshToken} = req.cookies;
//       const userData = await userService.refresh(refreshToken);
//       res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
//       return res.json(userData);
//     } catch (e) {
//       next(e);
//     }
//   }

  async getUser(req, res, next) {
    const {username} = req.query
    console.log(username)

    try {
      const user = await userService.getUser(username);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}


module.exports = new UserController();