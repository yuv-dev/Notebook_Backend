const {errorHandler} = require('./errorHandler');

const sendError = (err) => {
  errorHandler(err);
  return { success: false, error: err };
};

const sendSuccess = (message, body) => {
  return { success: true, message: message, data: body };
};

const sendFailed = (message) => {
  return { success: false, message: message };
};

const sendSigninSuccess = (message, data, token) => {
  return { success: true, message: message, data :data, accesstoken:token };
};


module.exports = { sendError, sendSuccess, sendSigninSuccess, sendFailed };
