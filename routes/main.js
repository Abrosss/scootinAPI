const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth")

//Main Routes - simplified for now
// router.get("/", mainController.getIndex);
// router.get("/profile", mainController.getProfile);
// // router.get("/feed", ensureAuth, postsController.getFeed);
// router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/:id/changePassword", authController.postChangePassword)
router.post("/:id/changeUsername", authController.postChangeUsername)
// // router.get("/logout", authController.logout);
// router.get("/signup", authController.getSignup);
router.get("/users/:email", authController.getUsers);
router.post("/signup", authController.postSignup);

module.exports = router;
