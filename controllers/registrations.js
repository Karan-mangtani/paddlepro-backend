const Joi = require("joi");
const Registation = require("../models/registration");
const { sendMail } = require("../utils/mailer");

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

const sendEmail = (params) => {
  const mailData = {
    from: 'connectpaddlepro@gmail.com',  // sender address
    to: params.email,   // list of receivers
    subject: 'Welcome on PaddlePro',
    text: 'That was easy!',
    html: `Hey <b> ${params.firstName } ${params.lastName}</b><br/><br/>
            <p>You have been registered under the team ${params.teamName}</p>
            <br/>  <br/>  <br/> 
            Thanks,<br/>PaddlePro`,
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
    sendEmail({email, firstName, lastName, teamName})
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