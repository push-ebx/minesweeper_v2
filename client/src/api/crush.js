import $api from "./config";

export default class CrashService {
  static async newBet(bet) {
    return $api.post('/newBetCrash', {
      bet
    })
  }

  static async getBank() {
    const res = await $api.get('/getBankCrash')
    return res.data
  }

  static async getHistory() {
    const res = await $api.get('/getHistoryCrash')
    return res.data
  }
}