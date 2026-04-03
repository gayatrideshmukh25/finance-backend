const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.js");
const { ok, created, fail } = require("../utils/response.js");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return fail(res, "Email and Password are required fields", 400);
    }
    let user = await UserModel.findByEmail(email);
    if (!user) {
      return fail(res, "Invalid Credentials", 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return fail(res, "Invalid Credentials", 401);
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return ok(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    clearToken(req.user.id);
    return ok(res, null, "Logged out successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
};
