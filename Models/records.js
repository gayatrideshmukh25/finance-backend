const BaseModel = require("./baseModel");

class RecordModel extends BaseModel {
  constructor() {
    super("records");
  }
}
module.exports = new RecordModel();
