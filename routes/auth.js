const express = require("express");
const router = express.Router();
const ctrl = require("./controller/auth.js");

const { authentication } = require("./middleware/auth.js");

router.post("/login", ctrl.login);
router.post("/logout", authentication, ctrl.logout);
router.get("/profile", authentication, ctrl.getProfile);
router.put("/profile", authentication, ctrl.updateProfile);

module.exports = router;
