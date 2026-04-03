const BaseModel = require("./baseModel");
class UserModel extends BaseModel {
  constructor() {
    super("users");
  }
}
module.exports = new UserModel();
