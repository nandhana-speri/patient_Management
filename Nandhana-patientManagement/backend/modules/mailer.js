const { createTransport } = require('nodemailer');
const { mail } = require('../config');
console.log(mail);

let transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: mail.email,
    pass: mail.password,
  },
});

module.exports = transporter;
