const express = require("express");
const { handleUserSignup, handleUserLogin, handleGoogleSignin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/google-signin", handleGoogleSignin);

module.exports = router;