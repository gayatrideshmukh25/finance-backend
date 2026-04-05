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
const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return fail(res, "User not found", 404);
    }
    return ok(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return fail(res, "User not found", 404);
    }
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await UserModel.update(req.user.id, updateData);
    return ok(res, {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
  getProfile,
  updateProfile,
};
