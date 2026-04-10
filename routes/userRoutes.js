const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {register, login, logout, getUser, getuserprofile} = require("../controllers/usercontroller");

router.post("/register", register);
router.post("/login", login);
router.get("/", getUser);
router.get("/logout", logout);
router.get("/getusers",auth, getuserprofile);

module.exports = router;