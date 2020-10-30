const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const path = require('path');
const app = express();
const pdfTemplate = require('./documents');

//Connect Database
connectDB();

//Init MiddleWare
app.use(express.json({ extended: false }));

app.get('/', function (req, res) {
  res.send('Api Running Correctly');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST Route - PDF generation and fetching of the data
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('Resume.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }

    res.send(Promise.resolve());
    console.log('Success');
  });
});

// Get - Send generated pdf to the client
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/Resume.pdf`);
});

//Defining Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server Started at Port ${PORT}`);
});
