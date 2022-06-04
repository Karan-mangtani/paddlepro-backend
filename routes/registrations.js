const express = require("express");
const registrationsControler = require("../controllers/registrations");

const router = express.Router();
router.get("/all-users", registrationsControler.getRegistrationsData);
router.post("/new-user", registrationsControler.registerNewUser);
module.exports = router;
