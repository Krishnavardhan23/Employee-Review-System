const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'krishnavk2305@gmail.com',
        pass: 'scme gfvy qjnw ukks'
    }
});

module.exports = transporter;