import $api from "./config";

export default class AuthService {
  static getUser() {
    return $api.get('/getUser')
  }
}