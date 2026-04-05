const dashboardModel = require("../models/dashboard.js");
const { ok, fail } = require("../utils/response.js");

exports.getDashboardData = async (req, res, next) => {
  try {
    const summary = await dashboardModel.getSummary();
    const counts = await dashboardModel.getCounts();
    const categoryTotals = await dashboardModel.getCategoryTotals();
    const recentActivity = await dashboardModel.getRecentActivity();
    return ok(
      res,
      {
        summary: {
          totalIncome: summary.totalIncome || 0,
          totalExpenses: summary.totalExpenses || 0,
          netBalance: summary.netBalance || 0,
        },
        counts,
        categoryTotals,
        recentActivity,
      },
      "Dashboard data retrieved successfully",
    );
  } catch (error) {
    next(error);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await dashboardModel.getSummary();
    return ok(
      res,
      {
        totalIncome: summary.totalIncome || 0,
        totalExpenses: summary.totalExpenses || 0,
        netBalance: summary.netBalance || 0,
      },
      "Summary data retrieved successfully",
    );
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const analytics = await dashboardModel.getAnalytics();
    return ok(res, analytics, "Analytics data retrieved successfully");
  } catch (error) {
    next(error);
  }
};
