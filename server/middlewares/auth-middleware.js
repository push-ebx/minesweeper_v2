const ApiError = require('../exceptions/api-error');
const crypto = require("crypto");
const {logger} = require("../utils");

module.exports = async function (req, res, next) {
  try {
    const {sign: sign_param, ts, payload} = req.query
    const client_secret = process.env.NODE_ENV === 'PROD' ? process.env.PROD_SECRET_KEY : process.env.DEV_SECRET_KEY

    const hash_params = {
      app_id: process.env.NODE_ENV === 'PROD' ? process.env.PROD_APP_ID : process.env.DEV_APP_ID,
      request_id: payload, // vk_id
      ts: ts,
      user_id: payload
    };

    const sign_params_query = new URLSearchParams(hash_params).toString();

    const sign = crypto.createHmac('sha256', client_secret)
      .update(sign_params_query)
      .digest("base64")
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    if (sign !== sign_param) {
      next(ApiError.UnauthorizedError());
    }

    req.payload = payload;
    next();
  } catch (e) {
    logger.info(`Auth: ${e}`);
    return next(ApiError.UnauthorizedError());
  }
};