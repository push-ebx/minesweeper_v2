const ApiError = require('../exceptions/api-error');
const crypto = require("crypto");

module.exports = function (req, res, next) {
  try {
    const {sign: sign_param, ts, payload} = req.body.data
    const client_secret = process.env.SECRET_KEY

    const hash_params = {
      app_id: process.env.APP_ID,
      request_id: payload,
      ts: ts,
      user_id: process.env.ADMIN_ID
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
    return next(ApiError.UnauthorizedError());
  }
};