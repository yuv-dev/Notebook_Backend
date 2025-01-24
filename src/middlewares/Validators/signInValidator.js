const { validationResult, check } = require("express-validator");
const { sendFailed } = require("../../utils/response");

/**
 * Perform various validation checks on the email, username and passsword field
 * @returns {Object} - Returns an object of validation checks
 */
const EmailValidator = () =>
  check("email").trim().notEmpty().withMessage("Email not provided");

const PasswordValidator = () =>
  check("password").trim().notEmpty().withMessage("Password not provided");

const UsernameValidator = () =>
  check("username").trim().notEmpty().withMessage("Username not provided");

/**
 * Validate the user sign in data
 * @returns {Object} - Returns a promise that resolves to an object of validation checks
 */
const validateUserSignInData = [
  EmailValidator(),
  UsernameValidator(),
  PasswordValidator(),
  (req, res, next) => {
    const errors = validationResult(req);
    const validatorErrorsFields = {};
    if (!errors.isEmpty()) {
      for (let err of errors.array()) {
        validatorErrorsFields[err.path] = true;
      }

      if (validatorErrorsFields["email"] && validatorErrorsFields["username"]) {
        return res
          .status(400)
          .send(sendFailed("No email or username provided"));
      }
      if (validatorErrorsFields["password"] === true) {
        return res.status(400).send(sendFailed("Password Not Provided"));
      }
    }
    next();
  },
];

module.exports = {
  validateUserSignInData,
};
