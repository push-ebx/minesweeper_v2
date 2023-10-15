import axios from 'axios';
import bridge from "@vkontakte/vk-bridge";

export const API_URL = import.meta.env.VITE_DOMAIN + '/api'

const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(async (config) => {
  const user = await bridge.send('VKWebAppGetUserInfo')
  const data = await bridge.send('VKWebAppCreateHash', {payload: user.id.toString()})

  if (data.sign) {
    config.params = data
  }

  return config;
})

export default $api;