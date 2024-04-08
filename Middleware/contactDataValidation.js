const contactModule = require("../Module/ContactModuleShema");

const validateContact = (req, res, next) => {
  const { name, email, phone, address } = req.body;
  const contacts = new contactModule(req.body);
  contacts
    .validate()
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
module.exports = validateContact;
