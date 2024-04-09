const router = require("express").Router();
const apiContact = require("./contact");
router.use('/contact', apiContact);
module.exports = router;