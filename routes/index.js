var express = require("express");
var router = express.Router();
let api = require("../controllers/api");

/* GET home page. */
router.get("/", api.get_home);
router.get("/get_fam", api.get_fam);

//main routes for data fetching
router.get("/get_family_member/:id", api.get_family_member);
router.get("/get_birth/:id", api.get_birth);

router.post("/create_family_account", api.create_family_account);

module.exports = router;
