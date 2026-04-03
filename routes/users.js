const express = require("express");
const router = express.Router();
const ctrl = require("./controller/users.js");
const { authentication } = require("./middleware/auth.js");

router.post("/getAllUsers", authentication, allowRoles("admin"), ctrl.getAll);
router.post("/createUser", authentication, allowRoles("admin"), ctrl.create);
router.get("/getUser/:id", authentication, allowRoles("admin"), ctrl.getById);
router.put("/updateUser/:id", authentication, allowRoles("admin"), ctrl.update);
router.delete(
  "/deleteUser/:id",
  authentication,
  allowRoles("admin"),
  ctrl.delete,
);

module.exports = router;
