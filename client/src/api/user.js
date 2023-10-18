import $api from "./config";

export default class UserService {
  static async getUser () {
    const res = await $api.get('/getUser')
    return res.data
  }

  static async createUser (_user) {
    const res = await $api.post('/createUser', {..._user})
    return res.data
  }
}