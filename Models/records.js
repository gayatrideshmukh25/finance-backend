const BaseModel = require("./baseModel.js");

class RecordModel extends BaseModel {
  constructor() {
    super("records");
  }
}
module.exports = new RecordModel();
