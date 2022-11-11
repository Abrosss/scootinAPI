const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")


router.post("/login", authController.postLogin);
router.post("/:id/changePassword", authController.postChangePassword)
router.post("/:id/changeUsername", authController.postChangeUsername)

router.get("/users/:email", authController.getUsers);
router.post("/signup", authController.postSignup);
router.post("/google-signup", authController.postGoogleSignup);
module.exports = router;
