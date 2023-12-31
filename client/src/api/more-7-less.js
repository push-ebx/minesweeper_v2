import $api from "./config";

export class TypeBet {
  static less = 'less'
  static equal = 'equal'
  static more = 'more'
}

export default class More7LessService {
  static async newBet(bet, type_bet) {
    return $api.post('/newBetM7L', {
      bet,
      type_bet
    })
  }

  static async getBank() {
    const res = await $api.get('/getBankM7L')
    return res.data
  }

  static async getHistory() {
    const res = await $api.get('/getHistoryM7L')
    return res.data
  }
}