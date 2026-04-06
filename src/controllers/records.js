const RecordModel = require("../models/records");
const UserModel = require("../models/users");
const { ok, created, fail } = require("../utils/response.js");

const createRecords = async (req, resp, next) => {
  try {
    const { amount, type, category, description, date } = req.body;
    if (!amount || !type || !category) {
      return fail({
        status: 400,
        success: false,
        message: "Amount, Type, and Category are required fields",
      });
    }
    let finalUserId;
    if (req.user.role === "admin") {
      let user_id = await UserModel.getByName(req.body.username);
      if (!user_id) {
        return fail({
          status: 400,
          success: false,
          message: "User not found",
        });
      }
      finalUserId = user_id;
    } else if (req.user.role === "analyst") {
      finalUserId = req.user.id;
    } else {
      return fail({
        status: 403,
        success: false,
        message: "Viewer not allowed to create records",
      });
    }

    const newRecord = await RecordModel.create({
      user_id: finalUserId,
      amount,
      type,
      category,
      description,
      date,
    });
    return created({
      success: true,
      data: newRecord,
      message: "Record created successfully",
    });
  } catch (err) {
    next(err);
  }
};
const getRecords = async (req, resp, next) => {
  try {
    const { date, category, type } = req.body;
    const filters = {};
    if (date) filters.date = date;
    if (category) filters.category = category;
    if (type) filters.type = type;
    const records = await RecordModel.getAll(filters);
    return ok({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

const getRecordById = async (req, resp, next) => {
  try {
    const record = await RecordModel.getById(req.params.id);
    if (!record) {
      return fail({ status: 404, success: false, message: "Record Not Found" });
    }
    return ok({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

const updateRecord = async (req, resp, next) => {
  try {
    const body = req.body;
    if (body.user_id) {
      return fail({
        status: 400,
        success: false,
        message: "user_id cannot be updated",
      });
    }
    const updatedRecord = await RecordModel.update(req.params.id, req.body);
    if (!updatedRecord) {
      return fail({ status: 404, success: false, message: "Record Not Found" });
    }
    return ok({
      success: true,
      data: updatedRecord,
      message: "Record updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, resp, next) => {
  try {
    const deleted = await RecordModel.delete(req.params.id);
    if (!deleted) {
      return fail({ status: 404, success: false, message: "Record Not Found" });
    }
    return ok({ success: true, message: "Record Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecord: createRecords,
  getRecords: getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};
