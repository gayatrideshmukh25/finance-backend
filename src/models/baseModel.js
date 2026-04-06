const db = require("../config/db");

class BaseModel {
  constructor(tableName, hiddenFields = []) {
    this.tableName = tableName;
    this.hiddenFields = hiddenFields;
  }

  excludeFields(data) {
    if (Array.isArray(data)) {
      return data.map((item) => this.excludeFields(item));
    }

    if (data && typeof data === "object") {
      const filtered = { ...data };
      this.hiddenFields.forEach((field) => {
        delete filtered[field];
      });
      return filtered;
    }

    return data;
  }

  async getAll(filters = {}, options = {}) {
    const { limit = 10, offset = 0 } = options;
    const safeLimit = Number(limit) || 10;
    const safeOffset = Number(offset) || 0;
    const whereClauses = [];
    const values = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        whereClauses.push(`${key} = ?`);
        values.push(value.toLowerCase().trim());
      }
    }
    const whereString =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
    const query = `
        SELECT * FROM ${this.tableName}
        ${whereString}
        LIMIT ${safeOffset}, ${safeLimit}
      `;
    const [rows] = await db.execute(query, values);
    return this.excludeFields(rows);
  }

  async getById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    console.log("getById results:", rows);
    return this.excludeFields(rows[0]);
  }

  async create(recordData) {
    try {
      const columns = Object.keys(recordData).join(", ");
      const placeholders = Object.keys(recordData)
        .map(() => "?")
        .join(", ");
      const values = Object.values(recordData);

      const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

      const [result] = await db.execute(query, values);
      const excludedData = this.excludeFields(result[0]);
      return { id: result.insertId, ...excludedData };
    } catch (err) {
      throw err;
    }
  }

  async update(id, updateData) {
    const setClauses = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(updateData), id];

    const query = `UPDATE ${this.tableName} SET ${setClauses} WHERE id = ?`;

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await db.execute(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id],
    );

    return this.excludeFields(rows[0]);
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const [result] = await db.execute(query, [id]);

    return result.affectedRows > 0;
  }
}

module.exports = BaseModel;
