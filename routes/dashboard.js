const express = require("express");
const router = express.Router();
const ctrl = require("./controller/dashboard.js");
const { authentication } = require("./middleware/auth.js");

router.get(
  "/",
  authentication,
  allowRoles("admin", "analyst", "viewer"),
  ctrl.getDashboardData,
);
router.get(
  "/summary",
  authentication,
  allowRoles("admin", "analyst", "viewer"),
  ctrl.getSummary,
);
router.get(
  "/analytics",
  authentication,
  allowRoles("admin", "analyst", "viewer"),
  ctrl.getAnalytics,
);

module.exports = router;
