// src/services/MongoDBService.js

const DatabaseService = require('./DatabaseService');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

const Customer = mongoose.model('Customer', customerSchema, 'customers');

class MongoDBService extends DatabaseService {
  constructor() {
    super(); // DatabaseService call constructor

    // MongoDB create conn.
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = mongoose.connection;

    this.db.on('error', console.error.bind(console, 'MongoDB conn err:'));
    this.db.once('open', () => {
      console.log('MongoDB connection success!');
    });
  }

  async getAllCustomers() {
    try {
      const Customer = mongoose.model('Customer');
      const customers = await Customer.find();
      return customers;
    } catch (error) {
      console.error('Fail get customers:', error);
      throw error;
    }
  }

  async getCustomerById(id) {
    try {
      const Customer = mongoose.model('Customer'); 
      const customer = await Customer.findById(id);
      return customer;
    } catch (error) {
      console.error('Fail get customer:', error);
      throw error;
    }
  }

  async createCustomer(customerData) {
    try {
      const Customer = mongoose.model('Customer');
      const newCustomer = new Customer(customerData);
      const savedCustomer = await newCustomer.save();
      return savedCustomer;
    } catch (error) {
      console.error('Fail create customer:', error);
      throw error;
    }
  }

  async updateCustomer(id, customerData) {
    try {
      const Customer = mongoose.model('Customer');
      const updatedCustomer = await Customer.findByIdAndUpdate(id, customerData, { new: true }); 
      return updatedCustomer;
    } catch (error) {
      console.error('Fail update customer:', error);
      throw error;
    }
  }

  async deleteCustomer(id) {
    try {
      const Customer = mongoose.model('Customer'); 
      await Customer.findByIdAndDelete(id);
      return { message: 'Success deletion customer' };
    } catch (error) {
      console.error('Fail delete customer: ', error);
      throw error;
    }
  }
  async testConnection() {
    // Check db conn.
    const isConnected = this.db.readyState === 1; // 1: Connect

    if (isConnected) {
      console.log('Database connection is active.');
      return true;
    } else {
      console.error('Database connection is not active.');
      return false;
    }
  }
}


module.exports = MongoDBService;
