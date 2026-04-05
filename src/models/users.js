const BaseModel = require("./baseModel");
const db = require("../config/db");
class UserModel extends BaseModel {
  constructor() {
    super("users", ["password"]);
  }
  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const results = await db.execute(query, [email]);
    return results[0][0] || null;
  }
  async getByName(username) {
    const query = "SELECT id FROM users WHERE username = ?";

    const [rows] = await db.execute(query, [username]);
    console.log("getByName result:", rows[0]?.id || null); // debug
    return rows.length ? rows[0].id : null;
  }
  async findById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const results = await db.execute(query, [id]);
    return results[0][0] || null;
  }
}
module.exports = new UserModel();
