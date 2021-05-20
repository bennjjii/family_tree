var express = require("express");
var router = express.Router();
let api = require("../controllers/api");
let authenticateToken = require("../controllers/middleware/auth");
let {
  upload_controller,
  getListFiles,
  download,
} = require("../controllers/upload_controller");
let {
  download_aws,
  multerMiddleware,
  upload_aws,
} = require("../controllers/middleware/aws_pipe");
let process_and_save_image = require("../controllers/middleware/process_and_save_image");
let { get_target_data } = require("../controllers/get_target_data_2");
let { create_new_child } = require("../controllers/create_new_child_2");
let { create_new_parent } = require("../controllers/create_new_parent");
let { create_new_spouse } = require("../controllers/create_new_spouse");
let { delete_family_member } = require("../controllers/delete_family_member");
let { delete_marriage } = require("../controllers/delete_marriage");
let { edit_family_member } = require("../controllers/edit_family_member");
let { edit_marriage } = require("../controllers/edit_marriage");
let { getSettings, setSettings } = require("../controllers/settings");
let { find_public_tree } = require("../controllers/find_public_tree");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
router.post("/get_target_data", authenticateToken, get_target_data);
router.post("/create_new_child", authenticateToken, create_new_child);
router.post("/create_new_parent", authenticateToken, create_new_parent);
router.post("/create_new_spouse", authenticateToken, create_new_spouse);
router.post(
  "/upload",
  authenticateToken,
  upload_controller,
  process_and_save_image
); //not used
router.post("/upload_aws", authenticateToken, multerMiddleware, upload_aws);
router.get("/download_aws/:name", authenticateToken, download_aws); //change to post - UUID sent as plaintext

router.get("/files", getListFiles); //redundant
router.get("/files/:name", authenticateToken, download); //not used

router.post("/register", api.register);
router.post("/login", api.login);
router.post("/logout", api.logout);
router.post("/refresh", api.getAccessToken);

router.post("/delete", authenticateToken, delete_family_member);
router.post("/delete_marriage", authenticateToken, delete_marriage);
router.post("/edit", authenticateToken, edit_family_member);
router.post("/edit_marriage", authenticateToken, edit_marriage);

//account settings

router.get("/getSettings", getSettings);
router.post("/setSettings", setSettings);

//accessing family trees that have been made public

router.get("/public/:public_name");
router.get("/find_public_tree/:publicTreeName", find_public_tree);

module.exports = router;
