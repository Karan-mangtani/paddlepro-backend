const express = require("express");
const contactUsControler = require("../controllers/contactUs");

const router = express.Router();
router.get("/", contactUsControler.getContactUsData);
router.get("/:roll", contactUsControler.getspecContactUs);
router.post("/", contactUsControler.createContactUs);
router.patch("/:roll", contactUsControler.updateContactUs);
router.delete("/:roll", contactUsControler.deleteContactUs);
module.exports = router;
