var express = require("express");
var router = express.Router();
let api = require("../controllers/api");

router.get("/get_target_data/:id", api.get_target_data);
router.post("/add_family_member", api.create_family_member);

module.exports = router;
