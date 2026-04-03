const db = require("../config/db");

exports.getSummary = async () => {
  const [rows] = await db.execute(`
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS netBalance
    FROM records
  `);

  return rows[0];
};

exports.getCounts = async () => {
  const [rows] = await db.execute(`
    SELECT COUNT(*) AS totalRecords FROM records
  `);

  return rows[0];
};

exports.getCategoryTotals = async () => {
  const [rows] = await db.execute(`
    SELECT category, SUM(amount) AS total
    FROM records
    GROUP BY category
  `);

  return rows;
};

exports.getRecentActivity = async () => {
  const [rows] = await db.execute(`
    SELECT id, title, amount, type, created_at
    FROM records
    ORDER BY created_at DESC
    LIMIT 5
  `);

  return rows;
};

exports.getAnalytics = async () => {
  const [rows] = await db.execute(`
    SELECT 
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
    FROM records
    GROUP BY month
    ORDER BY month
  `);
  const [weeklyData] = await db.execute(`
    SELECT 
      DATE_FORMAT(created_at, '%Y-%m') AS weekly,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense
    FROM records
    GROUP BY weekly
    ORDER BY weekly
  `);

  return { monthly: rows, weekly: weeklyData };
};
