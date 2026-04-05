const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users.js");
const { authentication } = require("../middleware/authHandler.js");
const { allowRoles } = require("../middleware/rbac.js");

router.post("/getAll", authentication, allowRoles("admin"), ctrl.getUsers);
router.post("/create", authentication, allowRoles("admin"), ctrl.createUser);
router.get("/:id", authentication, allowRoles("admin"), ctrl.getUserById);
router.put("/:id", authentication, allowRoles("admin"), ctrl.updateUser);
router.delete("/:id", authentication, allowRoles("admin"), ctrl.deleteUser);
module.exports = router;
