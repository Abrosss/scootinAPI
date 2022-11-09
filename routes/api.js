const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");


//Main Routes - simplified for now
router.get("/:id/rides", apiController.getRides)
router.get("/cities",apiController.getCities)
router.post("/:id/rides", apiController.postRides)
// router.get("/lessons", adminController.getAllLessons);
// router.get("/lessons/:id", adminController.getOneLesson);
// router.post("/addLessonYoutube", adminController.postYoutubeLesson);
// router.get("/dictionary", adminController.getWords);
// router.post("/dictionary/addWords", adminController.postWords);
// router.put("/lessons/:id", adminController.editLesson)
// router.delete("/lessons/:id", adminController.deleteLesson)
// router.get("/feed", ensureAuth, postsController.getFeed);
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get("/logout", authController.logout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

module.exports = router;
