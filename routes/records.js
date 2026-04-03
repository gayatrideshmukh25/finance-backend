const express = require("express");
const router = express.Router();
const ctrl = require("../controller/records.js");
const { authentication } = require("../middleware/authHandler.js");
const { allowRoles } = require("../middleware/rbac.js");
router.post(
  "/getAllRecords",
  authentication,
  allowRoles("admin", "Analyst", "viewer"),
  ctrl.getRecords,
);
router.post(
  "/createRecord",
  authentication,
  allowRoles("admin"),
  ctrl.createRecord,
);
router.get(
  "/getRecord/:id",
  authentication,
  allowRoles("admin", "Analyst", "viewer"),
  ctrl.getRecordById,
);
router.put(
  "/updateRecord/:id",
  authentication,
  allowRoles("admin"),
  ctrl.updateRecord,
);
router.delete(
  "/deleteRecord/:id",
  authentication,
  allowRoles("admin"),
  ctrl.deleteRecord,
);
module.exports = router;
