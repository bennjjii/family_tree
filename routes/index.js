var express = require("express");
var router = express.Router();
let api = require("../controllers/api");
let { authenticateToken } = require("../controllers/middleware/auth");
let {
  upload_controller,
  getListFiles,
  download,
} = require("../controllers/upload_controller");
let process_and_save_image = require("../controllers/middleware/process_and_save_image");
let { get_target_data } = require("../controllers/get_target_data_2");
let { create_new_child } = require("../controllers/create_new_child_2");
let { create_new_parent } = require("../controllers/create_new_parent");
let { create_new_spouse } = require("../controllers/create_new_spouse");
let { delete_family_member } = require("../controllers/delete_family_member");
let { delete_marriage } = require("../controllers/delete_marriage");
let { edit_family_member } = require("../controllers/edit_family_member");
let { edit_marriage } = require("../controllers/edit_marriage");

router.post("/get_target_data", authenticateToken, get_target_data);
router.post("/create_new_child", authenticateToken, create_new_child);
router.post("/create_new_parent", authenticateToken, create_new_parent);
router.post("/create_new_spouse", authenticateToken, create_new_spouse);
router.post(
  "/upload",
  authenticateToken,
  upload_controller,
  process_and_save_image
);
router.get("/files", getListFiles);
router.get("/files/:name", authenticateToken, download);
router.post("/register", api.register);
router.post("/login", api.login);
router.post("/logout", api.logout);
router.post("/refresh", api.getAccessToken);

router.post("/delete", authenticateToken, delete_family_member);
router.post("/delete_marriage", authenticateToken, delete_marriage);
router.post("/edit", authenticateToken, edit_family_member);
router.post("/edit_marriage", authenticateToken, edit_marriage);

module.exports = router;
