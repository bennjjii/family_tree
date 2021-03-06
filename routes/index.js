var express = require("express");
var router = express.Router();
let api = require("../controllers/api");
let get_target_data = require("../controllers/get_target_data");

router.get("/get_target_data/:id", api.get_target_data);
router.post("/add_family_member", api.create_family_member);
router.post("/create_new_child", api.create_new_child);
router.post("/create_new_parent", api.create_new_parent);
router.post("/create_new_spouse", api.create_new_spouse);
router.post("/register", api.register);
router.post("/login", api.login);

module.exports = router;
