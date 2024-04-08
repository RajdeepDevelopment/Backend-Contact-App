const express = require("express");
const Contrillers = require("../Controller/ContactController");
const router = express.Router();
const validateMiddleware = require("../Middleware/contactDataValidation");
router
  .get("/", Contrillers.getConcart)
  .post("/", validateMiddleware, Contrillers.createContact)
  .put("/:id", validateMiddleware, Contrillers.updateContact)
  .patch("/:id", () => {})
  .delete("/:id", Contrillers.deleteContact);
module.exports = router;
