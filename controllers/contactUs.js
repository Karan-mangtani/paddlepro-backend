const ContactUs = require("../models/contactUs");

const getContactUsData = async (req, res) => {
  try {
    const student = await ContactUs.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getspecContactUs = async (req, res) => {
  const phoneNo = req.params.phoneNo;
  try {
    const contactUsPhone = await ContactUs.find({ phoneNo: phoneNo });
    res.status(200).json(contactUsPhone);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createContactUs = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, phoneNo, email, country } = req.body;

  // const { error } = validate(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }

  let contactUs = new ContactUs({
    firstName,
    lastName,
    phoneNo,
    email,
    country,
  });
  try {
    await contactUs.save();
    res.status(201).json(contactUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContactUs = async (req, res) => {
  debuggger;
  const { phoneNoParam } = req.params;
  const { firstName, lastName, phoneNo, email, country } = req.body;
  try {
    await Student.findOneAndUpdate(
      {
        phoneNo: phoneNoParam,
      },
      {
        firstName,
        lastName,
        phoneNo,
        email,
        country,
      }
    );
    res.status(202).json({ phoneNo: phoneNoParam });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deleteContactUs = async (req, res) => {
  const { phoneNo } = req.params;

  try {
    let a = await Student.findOneAndRemove({ phoneNo: phoneNo });
    console.log("adity", a);
    res.status(203).json({ phoneNo: phoneNo });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

const contactUsControler = {
  getContactUsData,
  createContactUs,
  getspecContactUs,
  deleteContactUs,
  updateContactUs,
};
module.exports = contactUsControler;
