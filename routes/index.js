var express = require("express");
var router = express.Router();
let api = require("../controllers/api");

/* GET home page. */
router.get("/", api.get_home);

//main routes for data fetching
router.get("/get_family_member/:id", api.get_family_member);
router.get("/get_target/:id", api.get_target);
router.get("/get_birth/:id", api.get_birth);
router.get("/get_children/:id", api.get_children);
router.get("/get_marriage/:id", api.get_marriage);

module.exports = router;
