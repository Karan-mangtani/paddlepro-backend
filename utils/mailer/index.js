var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtpout.asia.secureserver.net",
    auth: {
        user: 'Info@padelleagueuae.com',
        pass: 'PadelLeagueUAE2022',
    },
    secure: true,
});

const sendMail = (mailData) => {
    return new Promise((resolve, reject) => {
        
        transporter.sendMail(mailData, function (err, info) {
            if (err) {
                console.log(err);
                reject();
            } else {
                console.log(info);
                resolve(info);
            }
        });
    })
}

module.exports = {
    sendMail
}