const BaseModel = require("./baseModel");
const db = require("../config/db");
class UserModel extends BaseModel {
  constructor() {
    super("users");
  }
  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const results = await db.execute(query, [email]);
    return results[0][0] || null;
  }
}
module.exports = new UserModel();
