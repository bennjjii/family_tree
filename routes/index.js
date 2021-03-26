var express = require("express");
var router = express.Router();
let api = require("../controllers/api");
let { authenticateToken } = require("../controllers/auth");
let { get_target_data } = require("../controllers/get_target_data");
let { create_new_child } = require("../controllers/create_new_child");
let { create_new_parent } = require("../controllers/create_new_parent");
let { create_new_spouse } = require("../controllers/create_new_spouse");
let { create_family_member } = require("../controllers/create_family_member");

//router.get("/get_target_data/:id", get_target_data);
//router.get("/get_target_data/:id", authenticateToken, get_target_data);
router.post("/get_target_data", authenticateToken, get_target_data);
router.post("/add_family_member", create_family_member);
router.post("/create_new_child", create_new_child);
router.post("/create_new_parent", create_new_parent);
router.post("/create_new_spouse", create_new_spouse);
router.post("/register", api.register);
router.post("/login", api.login);
router.post("/logout", api.logout);
router.post("/refresh", api.getAccessToken);

module.exports = router;
