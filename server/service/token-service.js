const jwt = require('jsonwebtoken');
// const {User} = require("../config");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '7d'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '14d'})
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  async saveToken(user_id, refreshToken) {
    // await User.doc(user_id.toString()).update({
    //   refreshToken
    // })
    return refreshToken
  }

  async removeToken(refreshToken) {
    // const tokenData = await tokenModel.deleteOne({refreshToken})
    // return tokenData;
  }

  async findToken(refreshToken) {
    // const tokenData = await tokenModel.findOne({refreshToken})
    // return tokenData;
  }
}

module.exports = new TokenService();