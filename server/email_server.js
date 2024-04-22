const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getDbConnection = require('./dbConfig');
const generateToken = require('./token_generator');
const generateMagicLink = require('./link_creator');

const app = express();
const port = 3002;
app.use(express.json());

// Enable preflight requests for all routes
app.use(cors());

app.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    let pool = await getDbConnection();
    let result = await pool.request()
      .query(`SELECT * FROM dbo.Users WHERE user_email = '${ email }'`);

    let user = null;
    if (result.recordset.length > 0) {
      user = result.recordset[0];

      const token = generateToken(user.user_id, user.user_email, user.user_name, user.user_role);
      const url = generateMagicLink(token);

      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Finalizează autentificarea! - Librăria Audiobook FAR',
        text: 'Acesta este link-ul tău pentru autentificare!',
        html: `<a href="${url}">Autentifică-te aici!</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: error.toString() });
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

    // Always send a success message, regardless of whether the email exists or not
    res.json({ message: 'If the email is registered, you will receive a magic link shortly.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

app.get('/verify', async (req, res) => {
  console.log('Verify route hit'); // Log when the route is hit
  const token  = req.query.token
  if (token == null) return res.sendStatus(401)

  try {
    console.log('Verifying token'); // Log before verifying the token
    const decodededToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodededToken);
    const userId = decodededToken.userId
    let pool = await getDbConnection();
    let result = await pool.request()
      .query(`SELECT * FROM dbo.Users WHERE user_id = '${ userId }'`);


      if (result.recordset.length > 0) {
        console.log(`Bine ai venit, ${result.recordset[0].user_name}!`);

        const authToken = req.query.token;

        res.cookie("authToken", `${authToken}`, { httpOnly: true });
        res.redirect(`${process.env.APP_URL}`);
      } else {
        console.log('User not found'); // Log when the user is not found
        res.status(404).json({ message: 'User not found' });
      }
  } catch (err) {
    console.log(err);
    res.redirect(`${process.env.APP_URL}`);
  }
});

app.get('/allAudiobooks', async (req, res) => {
  try {
    let pool = await getDbConnection();
    let result = await pool.request()
      .query(`SELECT * FROM dbo.Audiobooks`); // replace 'dbo.Audiobooks' with your actual audiobooks table name

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ message: 'No audiobooks found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

app.get('/allChapters', async (req, res) => {
  try {
    let pool = await getDbConnection();
    let result = await pool.request()
      .query(`SELECT * FROM dbo.Chapters`); // replace 'dbo.Chapters' with your actual chapters table name

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ message: 'No chapters found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

app.get('/chapter', async (req, res) => {
  try {
    let pool = await getDbConnection();
    let result = await pool.request()
      .query(`SELECT * FROM dbo.Chapters WHERE chapter_id = '${ req.query.chapter_id }'`); // replace 'dbo.Chapters' with your actual chapters table name

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ message: 'No chapters found' });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

app.get('/audiobook', async (req, res) => {
  try {
    let pool = await getDbConnection();
    let result = await pool.request()
      .query(`SELECT * FROM dbo.Audiobooks WHERE audiobook_id = '${ req.query.audiobook_id }'`); // replace 'dbo.Chapters' with your actual chapters table name

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ message: 'No audiobook found' });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};




module.exports = { start };