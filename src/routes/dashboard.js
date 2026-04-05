const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/dashboard.js");
const { authentication } = require("../middleware/authHandler.js");
const { allowRoles } = require("../middleware/rbac.js");

router.get(
  "/",
  authentication,
  allowRoles("admin", "analyst", "viewer"),
  ctrl.getDashboardData,
);
router.get(
  "/summary",
  authentication,
  allowRoles("admin", "analyst"),
  ctrl.getSummary,
);
router.get(
  "/analytics",
  authentication,
  allowRoles("admin", "analyst"),
  ctrl.getAnalytics,
);

module.exports = router;
