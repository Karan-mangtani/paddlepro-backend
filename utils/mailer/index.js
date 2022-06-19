var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'connectpaddlepro@gmail.com',
        pass: 'tkgaymnlklmbbhos',
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