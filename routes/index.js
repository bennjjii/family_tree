var express = require("express");
var router = express.Router();
let api = require("../controllers/api");
let { get_target_data } = require("../controllers/get_target_data");
let { create_new_child } = require("../controllers/create_new_child");
let { create_new_parent } = require("../controllers/create_new_parent");

router.get("/get_target_data/:id", get_target_data);
router.post("/add_family_member", api.create_family_member);
router.post("/create_new_child", create_new_child);
router.post("/create_new_parent", create_new_parent);
router.post("/create_new_spouse", api.create_new_spouse);
router.post("/register", api.register);
router.post("/login", api.login);

module.exports = router;
