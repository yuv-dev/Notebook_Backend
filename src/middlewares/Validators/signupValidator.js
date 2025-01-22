const { validationResult, check } = require("express-validator");

/**
 * Peforms validation on the email field, password field, name field and username field
 * @returns {Array} An array of validation middlewares
 */
const EmailValidator = () =>
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email not provided")
    .bail()
    .isEmail()
    .withMessage("Invalid email");

const PasswordValidator = () =>
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password not provided")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters");

const NameValidator = () =>
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name not provided")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters");

const UsernameValidator = () =>
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username not provided")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters");

/**
 * Validates the user registration data
 * @returns {Array} An array of validation check result in form of a json object
 */
const validateUserRegisterData = [
  NameValidator(),
  EmailValidator(),
  UsernameValidator(),
  PasswordValidator(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


module.exports = {        
  validateUserRegisterData,
};
