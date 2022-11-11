const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");


//Main Routes - simplified for now
router.get("/:id/rides", apiController.getRides)
router.get("/cities",apiController.getCities)
router.post("/:id/rides", apiController.postRides)


module.exports = router;
