const Joi = require("joi");
const ContactUs = require("../models/contactUs");
const { sendMail } = require("../utils/mailer");

function validateContactus(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().allow(null).allow('').optional(),
    phoneNo: Joi.number().required(),
    email: Joi.string().min(5).max(255).required().email(),
    country: Joi.string().allow(null).allow('').optional(),
    dob: Joi.string().allow(null).allow('').optional(),
    inquire: Joi.string().allow(null).allow('').optional()
  })
  return schema.validate(user)

}

const sendEmail = (params) => {
  const mailData = {
    from: 'Info@padelleagueuae.com',  // sender address
    to: params.email,   // list of receivers
    subject: 'Paddle League',
    text: 'Email From PaddlePro',
    html: `Hey <b> ${params.firstName } ${params.lastName || ''}</b><br/>
            <p>Thank you for contacting Padel League UAE, Our team will be in touch very soon</p>
            <br/>  <br/> 
            Thanks,<br/>PaddlePro`,
  };
  sendMail(mailData);
}

const sendEmailToCompany = (params) => {
  const mailData = {
    from: 'Info@padelleagueuae.com',  // sender address
    to: "Info@padelleagueuae.com",   // list of receivers
    subject: 'Paddle League - New Enquiry',
    text: 'Email From PaddlePro',
    html: ` Hello Admin, </br> </br>
            A new enquiry is been posted on Paddle league website Please see the client details and enquiry text below: </br> </br>
            <b> Contact Details</b><br/><br/>
            Name: ${params.firstName}<br/>
            Email: ${params.email}<br/>
            Phone: ${params.phoneNo}<br/>
            Inquire text: ${params.inquire}<br/>
`,
  };
  sendMail(mailData);
}

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
  const { firstName, lastName, phoneNo, email, country, dob, inquire } = req.body;

  const { error } = validateContactus(req.body);
  if (error) {
    console.log("err",error)
    return res.status(400).send(error.message);
  }

  let contactUs = new ContactUs({
    firstName,
    lastName,
    phoneNo,
    email,
    country,
    dob,
    inquire
  });
  try {
    await contactUs.save();
    sendEmail({email, firstName, lastName});
    sendEmailToCompany(req.body);
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
