const { check, validationResult } = require("express-validator");

const userValidator = [
  check("username").notEmpty().withMessage("Username required"),

  check("email").isEmail().notEmpty().withMessage("Invalid email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Min 6 characters required"),

  check("role")
    .isIn(["admin", "analyst", "viewer"])
    .withMessage("role must be admin, analyst, or viewer"),
];

const validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  userValidator,
  validation,
};
