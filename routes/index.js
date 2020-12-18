var express = require("express");
var router = express.Router();
let api = require("../controllers/api");

/* GET home page. */
router.get("/", api.get_home);
router.get("/get_fam", api.get_fam);
router.post("/create_family_account", api.create_family_account);

module.exports = router;
