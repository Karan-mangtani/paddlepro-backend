const Joi = require("joi");
const Registation = require("../models/registration");
const { sendMail } = require("../utils/mailer");
const { getHtmlTemplate } = require("../utils/mailer/template")

function validateRegistration(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        phoneNo: Joi.number().required(),
        email: Joi.string().min(5).max(255).required().email(),
        country: Joi.string().min(1).max(255).required(),
        dob: Joi.string().required(),
        gender: Joi.string().required(),
        paddleLevel: Joi.any(),
        teamName: Joi.string().required()
    })
    return schema.validate(user)

}

const sendEmailToUser = (params) => {
  const mailData = {
    from: 'connectpaddlepro@gmail.com',  // sender address
    to: params.email,   // list of receivers
    subject: 'Welcome on PaddlePro',
    text: 'Email From PaddlePro',
    html: getHtmlTemplate(params),
  };
  sendMail(mailData);
}

const sendEmailToCompany = (params) => {
  const mailData = {
    from: 'connectpaddlepro@gmail.com',  // sender address
    to: "Info@padelleagueuae.com",   // list of receivers
    subject: 'PaddlePro: New Regitration',
    text: 'Email From PaddlePro',
    html: ` <b> New User</b><br/><br/>
            Name: ${params.firstName} ${params.lastName}<br/>
            Email: ${params.email}<br/>
            Phone: ${params.phoneNo}<br/>
            Gender: ${params.gender}<br/>
            Level: ${params.paddleLevel}<br/>
            Team Name: ${params.teamName}<br/>
`,
  };
  sendMail(mailData);
}

const getRegistrationsData = async (req, res) => {
    try {
        const users = await Registation.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const registerNewUser = async (req, res) => {
    console.log(req.body);
  const { firstName, lastName, phoneNo, email, country, dob, gender, paddleLevel, teamName } = req.body;

  const { error } = validateRegistration(req.body);
  if (error) {
    console.log("err",error)
    return res.status(400).send(error.message);
  }

  let newUser = new Registation({
    firstName,
    lastName,
    phoneNo,
    email,
    country,
    dob,
    gender,
    paddleLevel, 
    teamName
  });
  try {
    await newUser.save();
    sendEmailToUser({email, firstName, lastName, teamName});
    sendEmailToCompany(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const contactUsControler = {
    getRegistrationsData,
    registerNewUser,
};
module.exports = contactUsControler;