const { json } = require("body-parser");
const Joi = require("joi");
const Registation = require("../models/registration");
const { sendMail } = require("../utils/mailer");
const { getHtmlTemplate } = require("../utils/mailer/template")

function validateRegistration(players) {
  const schema = Joi.array().items(
    Joi.object().keys(
      {
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().allow(null).allow('').optional(),
        phoneNo: Joi.number().required(),
        email: Joi.string().min(5).max(255).required().email(),
        country: Joi.string().allow(null).allow('').optional(),
        dob: Joi.string().allow(null).allow('').optional(),
        gender: Joi.string().required(),
        paddleLevel: Joi.any(),
        teamName: Joi.string().required()
      }
    )
  )
  return schema.validate(players)

}

const sendEmailToUser = (params) => {
  const mailData = {
    from: 'Info@padelleagueuae.com',  // sender address
    to: params.email,   // list of receivers
    subject: 'Welcome to Padel League',
    text: 'Email From Padel League',
    html: getHtmlTemplate(params),
  };
  sendMail(mailData);
}

const sendEmailToCompany = (players) => {
  let teamHtml = '';
  players.forEach((player, indexr) => {
    teamHtml = teamHtml + `Player ${indexr+1}<br/>
    Name: ${player.firstName} ${player.lastName}<br/>
    Email: ${player.email}<br/>
    Phone: ${player.phoneNo}<br/>
    Gender: ${player.gender}<br/>
    DOB: ${player.dob || ''}<br/>
    Level: ${player.paddleLevel}<br/><br/>`;
  })
  const mailData = {
    from: 'Info@padelleagueuae.com',  // sender address
    to: "Info@padelleagueuae.com",   // list of receivers
    subject: 'Padel League: New Regitration',
    text: 'Email From Padel League',
    html: ` <b> New Team Registered ${players[0].teamName}</b><br/><br/>
    ${teamHtml}`
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
  const players = req.body || [];

  const { error } = validateRegistration(req.body);
  if (error) {
    console.log("err",error)
    return res.status(400).send(error.message);
  }

  let items = [];

  players.forEach(player => {
    items.push(
      new Promise(async(resolve, reject) => {
        let doc = new Registation({
          ...player
        });
        try {
          await doc.save();
          sendEmailToUser({...player});
          resolve()
        } catch (error) {
          reject({ message: error.message,user: player.name })
        }
      })
    )
  })

  Promise.allSettled(items).then(result => {
    sendEmailToCompany(req.body);
    return result.filter(result => result.status === "fulfilled").length === players.length ?
      res.status(200).send({message: "All Players registered"}) : res.status(400).send({message : "Error while registering player"});
  })
}

const contactUsControler = {
    getRegistrationsData,
    registerNewUser,
};
module.exports = contactUsControler;
