const RecordModel = require("../models/records");

const createRecords = async (req, resp, next) => {
  try {
    const { amount, type, category, description } = req.body;
    if (!amount || !type || !category) {
      return resp
        .status(400)
        .json({ message: "Amount, Type, and Category are required fields" });
    }
    const newRecord = await RecordModel.create({
      amount,
      type,
      category,
      description,
    });
    resp.status(201).json({ success: true, data: newRecord });
  } catch (err) {
    next(err);
  }
};
const getRecords = async (req, resp, next) => {
  try {
    const { date, category, type } = req.query;
    const filters = {};
    if (date) filters.date = date;
    if (category) filters.category = category;
    if (type) filters.type = type;
    const records = await RecordModel.getAll(filters);
    resp.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

const getRecordById = async (req, resp, next) => {
  try {
    const record = await RecordModel.getById(req.params.id);
    if (!record) {
      return resp.status(404).json({ message: "Record Not Found" });
    }
    resp.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

const updateRecord = async (req, resp, next) => {
  try {
    const updatedRecord = await RecordModel.update(req.params.id, req.body);
    if (!updatedRecord) {
      return resp.status(404).json({ message: "Record Not Found" });
    }
    resp.json({ success: true, data: updatedRecord });
  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, resp, next) => {
  try {
    const deleted = await RecordModel.delete(req.params.id);
    if (!deleted) {
      return resp.status(404).json({ message: "Record Not Found" });
    }
    resp.json({ success: true, message: "Record Deleted Successfully" });
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
