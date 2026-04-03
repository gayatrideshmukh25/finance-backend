const { ok, created, fail } = require("../utils/response.js");
const UserModel = require("../models/users.js");
const bcrypt = require("bcrypt");
const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return fail(
        res,
        "Username, Email, and Password are required fields",
        400,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return created(res, newUser, "User created successfully");
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role } = req.query;
    const filters = {};
    if (role) filters.role = role;
    const users = await UserModel.getAll(filters, { page, limit });
    return ok(res, users, "Users retrieved successfully");
  } catch (err) {
    next(err);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.getById(req.params.id);
    if (!user) {
      return fail(res, "User Not Found", 404);
    }
    return ok(res, user, "User retrieved successfully");
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.update(req.params.id, req.body);
    if (!updatedUser) {
      return fail(res, "User Not Found", 404);
    }
    return ok(res, updatedUser, "User updated successfully");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await UserModel.delete(req.params.id);
    if (!deleted) {
      return fail(res, "User Not Found", 404);
    }
    return ok(res, null, "User Deleted Successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
