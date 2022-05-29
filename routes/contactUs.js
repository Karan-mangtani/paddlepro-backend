const express = require("express");
const contactUsControler = require("../controllers/contactUs");

const router = express.Router();
router.get("/all-records", contactUsControler.getContactUsData);
router.get("/record/:id", contactUsControler.getspecContactUs);
router.post("/new-record", contactUsControler.createContactUs);
// router.patch("/:roll", contactUsControler.updateContactUs);
// router.delete("/:roll", contactUsControler.deleteContactUs);
module.exports = router;
