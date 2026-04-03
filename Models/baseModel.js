class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }
  async getAll(filters = {}, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const whereClauses = [];
    const values = [];
    let index = 1;
    for (const [key, value] of Object.entries(filters)) {
      whereClauses.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }
    const whereString =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
    const query = `SELECT * FROM ${this.tableName} ${whereString} LIMIT $${index} OFFSET $${index + 1}`;
    values.push(limit, offset);
    const [rows] = await db.execute(query, values);
    return rows;
  }

  getById = async (id) => {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  };

  create = async (recordData) => {
    const columns = Object.keys(recordData).join(", ");
    const placeholders = Object.keys(recordData)
      .map(() => "?")
      .join(", ");
    const values = Object.values(recordData);
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    const [result] = await db.execute(query, values);
    return { id: result.insertId, ...recordData };
  };

  update = async (id, updateData) => {
    const setClauses = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);
    values.push(id);
    const query = `UPDATE ${this.tableName} SET ${setClauses} WHERE id = ?`;
    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
  };

  delete = async (id) => {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  };
}

module.exports = BaseModel;
