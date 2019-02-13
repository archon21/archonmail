const router = require('express').Router();
const nodemailer = require('nodemailer');
module.exports = router;

// router.use('/users', require('./users'))

router.post('/send', (req, res, next) => {
  const output = `
  <p>You have a new Contact for ${req.body.message.email}</p>
  <p>Contact Details.</p>
  <ul>
    <li>Name:${req.body.message.name ? req.body.message.name : 'Quick Contact'}
    <li>Email:${req.body.message.email}</li>
    <li>Subject:${req.body.message.subject}</li>
    <li>Phone:${
      req.body.message.phone
        ? req.body.message.phone
        : 'No Phone(Quick Message)'
    }</li>

  </ul>
  <h3>Message</h3>
  <p>${req.body.message.message}</p>
  `;
  let transporter = nodemailer.createTransport({
    service: 'gmail',

    secure: false, // true for 465, false for other ports
    auth: {
      user: 'infohayesmail@gmail.com', // generated ethereal user
      pass: 'Land1447' // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Website Contact" ${req.body.email}`, // sender address
    to: 'info@hayesdevelopers.com', // list of receivers
    subject: `${req.body.subject}`, // Subject line
    text: `${req.body.message}`, // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  const error = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return true;
    } else {
      return false;
    }
  });
  error ? res.send(true) : res.send(false);
}).json;

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
