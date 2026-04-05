const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users.js");
const { authentication } = require("../middleware/authHandler.js");
const { allowRoles } = require("../middleware/rbac.js");
const { userValidator, validation } = require("../middleware/validation.js");

router.post("/getAll", authentication, allowRoles("admin"), ctrl.getUsers);
router.post(
  "/create",
  authentication,
  allowRoles("admin"),
  userValidator,
  validation,
  ctrl.createUser,
);
router.get("/:id", authentication, allowRoles("admin"), ctrl.getUserById);
router.put("/:id", authentication, allowRoles("admin"), ctrl.updateUser);
router.delete("/:id", authentication, allowRoles("admin"), ctrl.deleteUser);
module.exports = router;
