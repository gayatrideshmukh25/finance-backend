const express = require("express");
const router = express.Router();
const ctrl = require("../controller/users.js");
const { authentication } = require("../middleware/authHandler.js");
const { allowRoles } = require("../middleware/rbac.js");

router.post("/getAllUsers", authentication, allowRoles("admin"), ctrl.getUsers);
router.post(
  "/createUser",
  authentication,
  allowRoles("admin"),
  ctrl.createUser,
);
router.get(
  "/getUser/:id",
  authentication,
  allowRoles("admin"),
  ctrl.getUserById,
);
router.put(
  "/updateUser/:id",
  authentication,
  allowRoles("admin"),
  ctrl.updateUser,
);
router.delete(
  "/deleteUser/:id",
  authentication,
  allowRoles("admin"),
  ctrl.deleteUser,
);
module.exports = router;
