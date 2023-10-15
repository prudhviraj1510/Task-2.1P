const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
const sendGridMail = require('@sendgrid/mail');
require("dotenv").config()
sendGridMail.setApiKey('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');

app.use(bodyParser)
app.use(function (req, res, next) {

  const allowedOrigins = ['http://localhost:3000' ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
})

app.listen(8080, function(request, response){
  console.log('server running of port 8080 successfully');
})


app.post('/post', bodyParser, (req, res)=>{
  let num1 = req.body.num1;
  let num2 = req.body.num2;
  let sum = Number(num1) + Number(num2);
  console.log(req);
  res.send('i am posting now' + sum);
})

function getMessage(fName, lName, email) {
  const body = 'Hey ' + fName + ' ' + lName + ', Thanks for joining DevDeakin!';
  console.log(body)
  return {
    to: email,
    from: 'payyappan@deakin.edu.au',
    subject: 'Test email with Node.js and SendGrid',
    text: body,
    html: `<strong>${body}</strong>`,
  };
}

app.get('/', (req, res) => {
  res.send('welcome to devlink')
})

app.post('/', async (req, res) => {
  const firstname = req.body.first_name
  const lastname = req.body.last_name
  const email = req.body.email
  try {
    await sendGridMail.send(getMessage(firstname, lastname, email));
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
})

app.post('/sendgrid', bodyParser, async (req, res) => {
  const email = req.body.email
  console.log('email: ' + email)
  const firstname = ''
  const lastname = ''
  try {
    await sendGridMail.send(getMessage(firstname, lastname, email));
    res.status(200).send('Subscribed too DevDeakin successfully!')
    console.log('Subscribed too DevDeakin successfully!');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    res.status(404).send('Error sending test email')
    if (error.response) {
      console.error(error.response.body)
    }
  }
})