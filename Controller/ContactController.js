const Contact = require("../Module/ContactModuleShema");
const [successResponse, errorResponse] = require("../Response/Wrapper");
// success : data, statusCode = 200, message = 'Success', dataLength
// Error :  message, statusCode
exports.getConcart = async (req, res) => {
  try {
    let response;
    let query = req.query;

    if (query.skip && query.limit) {
      const skip = parseInt(query.skip);
      const limit = parseInt(query.limit);
      response = await Contact.find({}).skip(skip).limit(limit);
      const count = await Contact.countDocuments({});
      res.status(200).json(successResponse(response, 200, "Success", count));
    } else {
      response = await Contact.find({}).skip(0).limit(10);
      const count = await Contact.countDocuments({});
      res.status(200).json(successResponse(response, 200, "Success", count));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse(error.message, 500));
  }
};

exports.createContact = async (req, res) => {
  try {
    const { id, firstName, lastName, gender, address, email, phone, other } =
      req.body;
    const contact = new Contact({
      id,
      firstName,
      lastName,
      gender,
      address,
      email,
      phone,
      other,
    });
    const saveContact = await contact.save();
    res.status(201).json(successResponse(saveContact, 201, "Success", 1));
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
};

exports.updateContact = async (req, res) => {
  try {
    const id = req?.params.id;
    const UpdateData = req?.body;
    const response = await Contact.findOneAndUpdate({ _id: id }, UpdateData, {
      new: true,
    });
    if (!response) {
      res.status(404).json(errorResponse("Contact not found", 404));
    } else {
      res
        .status(200)
        .json(
          successResponse(response, 200, "Contact updated successfully", 1)
        );
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Contact.findByIdAndDelete({ _id: id });
    if (!response) {
      res.status(404).json(errorResponse("Contact not found", 404));
    } else {
      res
        .status(200)
        .json(successResponse([], 200, "Contact deleted successfully", 0));
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message, 500));
    console.error(error);
  }
};
