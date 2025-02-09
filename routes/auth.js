const authController = require("../controller/authController");

const router = require("express").Router();

router.post("/register", authController.registerUser);

router.get("/login", authController.loginUser);
module.exports = router;