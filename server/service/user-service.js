const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');
const {User, Article} = require("../config");

class UserService {
  async registration(first_name, last_name, username, email, sex, password) { // проверка на существование
    const hashPassword = await bcrypt.hash(password, 3);

    const snapshot = await User.get();
    const count_users = snapshot.size

    const user = {
      first_name,
      last_name,
      username,
      email,
      sex,
      hashPassword
    }
    const user_id = count_users + 1 + ''
    await User.doc(user_id).set(user);

    const tokens = tokenService.generateTokens({username: user.username});
    await tokenService.saveToken(user_id, tokens.refreshToken);

    return {...tokens, user}
  }

  async getUser(username) {
    if (!username) {
      throw ApiError.BadRequest('the username is empty')
    }

    const snap_user = await User.where('username', '==', username).get()

    if (snap_user.empty) {
      throw ApiError.BadRequest('No matching articles')
    }
    const user = {
      id: +snap_user.docs[0].id,
      ...snap_user.docs[0].data()
    }
    // delete user.hashPassword

    return user
  }

  async getById(id) {
    if (!id) { // + проверка на корректность
      throw ApiError.BadRequest("this is not correct id")
    }

    const doc = await User.doc(id.toString()).get()
    const user_candidate = doc.data()

    if (!user_candidate) {
      throw ApiError.BadRequest("the user with this id was not found")
    }
    // delete user_candidate.hashPassword
    return user_candidate
  }
}

module.exports = new UserService();