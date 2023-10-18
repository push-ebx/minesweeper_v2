import $api from "./config";

export class TypeBet {
  static less = 'less'
  static equal = 'equal'
  static more = 'more'
}

export default class More7LessService {
  static async newBet(bet, type_bet) {
    return $api.post('/newBet', {
      bet,
      type_bet
    })
  }

  static async getBank() {
    const res = await $api.get('/getBank')
    return res.data
  }
}