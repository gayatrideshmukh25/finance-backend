const dashboardModel = require("../models/dashboardModel");

exports.getDashboardData = async (req, res) => {
  try {
    const summary = await dashboardModel.getSummary();
    const counts = await dashboardModel.getCounts();
    const categoryTotals = await dashboardModel.getCategoryTotals();
    const recentActivity = await dashboardModel.getRecentActivity();

    res.json({
      summary: {
        totalIncome: summary.totalIncome || 0,
        totalExpenses: summary.totalExpenses || 0,
        netBalance: summary.netBalance || 0,
      },
      counts,
      categoryTotals,
      recentActivity,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      message: "Error fetching dashboard",
    });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const summary = await dashboardModel.getSummary();

    res.json({
      totalIncome: summary.totalIncome || 0,
      totalExpenses: summary.totalExpenses || 0,
      netBalance: summary.netBalance || 0,
    });
  } catch (error) {
    console.error("Summary Error:", error);
    res.status(500).json({
      message: "Error fetching summary",
    });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await dashboardModel.getAnalytics();

    res.json({
      trends: {
        monthly: analytics.monthly,
        weekly: analytics.weekly,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({
      message: "Error fetching analytics",
    });
  }
};
