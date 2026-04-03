const BaseModel = require("./baseModel");
class AuthModel extends BaseModel {
  constructor() {
    super("users");
  }
}
module.exports = new AuthModel();
