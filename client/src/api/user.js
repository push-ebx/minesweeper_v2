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

  static async withdraw () {
    const res = await $api.post('/withdraw')
    return res.data
  }

  static async getTop () {
    const res = await $api.get('/getTop')
    return res.data
  }
}