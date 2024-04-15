// app.js dosyası

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

//  DB_CONNECTION 
let service;
const dbType = process.env.DB_CONNECTION;

switch (dbType) {
  case 'postgresql':
    const PostgreSQLService = require('./services/PostgreSQLService');
    service = new PostgreSQLService();
    break;

  case 'mongodb':
    const MongoDBService = require('./services/MongoDBService');
    service = new MongoDBService();
    break;

  case 'mysql':
    const MySQLService = require('./services/MySQLService');
    service = new MySQLService();
    break;

  default:
    console.error('DB_CONNECTION variable not correct:', process.env.DB_CONNECTION);
    process.exit(1); // send fatal
    break;
}

const checkConn = service.testConnection();

if (checkConn === false){
  console.error('Database Connection Fail:', process.env.DB_CONNECTION);
  process.exit(34);
}

// Gel all customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await service.getAllCustomers();
    console.log("request for get all /customers");
    res.json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Customer by id
app.get('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  console.log("request for get customer with id /customers/", customerId);
  try {
    const customer = await service.getCustomerById(customerId);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(customer);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New Customer
app.post('/customers', async (req, res) => {
  const customerData = req.body;
  try {
    const newCustomer = await service.createCustomer(customerData);
    console.log("request for customer create ", customerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Customer
app.put('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  const customerData = req.body;
  console.log("request for customer update ", customerId);
  try {
    const updatedCustomer = await service.updateCustomer(customerId, customerData);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// customer delete
app.delete('/customers/:id', async (req, res) => {
  
  const customerId = req.params.id;

  console.log("request for customer delete ", customerId);
  try {
    await service.deleteCustomer(customerId);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Main route
app.get('/', async (req, res) => {
  console.log("request for main route");
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (ip.startsWith('::ffff:')) {
    ip = ip.slice(7); // ::ffff remove
  }

  let ua = req.headers['user-agent'];
  let dbConnStatus = await service.testConnection();

  res.json(
    {
      client_ip: ip,
      user_agent: ua,
      service_status_is: 'OK',
      db_connection_is: dbConnStatus,
      db_type: dbType
    }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

