const express = require("express");
const router = express.Router();
const ctrl = require("./controller/records.js");
const { authentication } = require("./middleware/auth.js");

router.post(
  "/getAllRecords",
  authentication,
  allowRoles("admin", "Analyst", "viewer"),
  ctrl.getAll,
);
router.post("/createRecord", authentication, allowRoles("admin"), ctrl.create);
router.get(
  "/getRecord/:id",
  authentication,
  allowRoles("admin", "Analyst", "viewer"),
  ctrl.getById,
);
router.put(
  "/updateRecord/:id",
  authentication,
  allowRoles("admin"),
  ctrl.update,
);
router.delete(
  "/deleteRecord/:id",
  authentication,
  allowRoles("admin"),
  ctrl.delete,
);
module.exports = router;
