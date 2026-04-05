const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/records.js");
const { authentication } = require("../middleware/authHandler.js");
const { allowRoles } = require("../middleware/rbac.js");
router.post(
  "/getAll",
  authentication,
  allowRoles("admin", "analyst"),
  ctrl.getRecords,
);
router.post("/create", authentication, allowRoles("admin"), ctrl.createRecord);
router.get(
  "/:id",
  authentication,
  allowRoles("admin", "analyst"),
  ctrl.getRecordById,
);
router.put("/:id", authentication, allowRoles("admin"), ctrl.updateRecord);
router.delete("/:id", authentication, allowRoles("admin"), ctrl.deleteRecord);
module.exports = router;
