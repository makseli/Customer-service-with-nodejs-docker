// app.js

const express = require('express');
const dotenv = require('dotenv');

// .env variable load
dotenv.config();

// Express uygulaması oluştur
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // JSON body parser middleware

// Routes
app.get('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    let ua = req.headers['user-agent']
    res.json(
      {
        your_ip: ip,
        user_agent: ua,
        service_status_is: 'OK',
        customer_endpoint: '/customer'
      }
      );
});


// Run Server
app.listen(port, () => {
  console.log(`Server running ${port} !`);
});