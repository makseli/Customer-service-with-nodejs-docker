// test/MongoDBService.test.js

const MongoDBService = require('../services/MongoDBService');
const mongoose = require('mongoose');

// Using Jest to test the MongoDBService class
describe('MongoDBService', () => {
  let mongoDBService;

  // Setup before running the tests
  beforeAll(async () => {
    // Instantiate an instance of the MongoDBService class
    mongoDBService = new MongoDBService();

    // Connect to MongoDB before running the tests
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Cleanup after running all the tests
  afterAll(async () => {
    // Disconnect from MongoDB after running all the tests
    await mongoose.disconnect();
  });

  // Test the createCustomer() method
  it('should create a new customer', async () => {
    const customerData = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    const createdCustomer = await mongoDBService.createCustomer(customerData);

    // Assert that the created customer has the expected data
    expect(createdCustomer.name).toBe('John Doe');
    expect(createdCustomer.email).toBe('john@example.com');
  });

  // Test the getAllCustomers() method
  it('should retrieve all customers', async () => {
    const customers = await mongoDBService.getAllCustomers();

    // Assert that at least one customer is retrieved
    expect(customers.length).toBeGreaterThan(0);
  });

  // Test the getCustomerById() method
  it('should retrieve a customer by ID', async () => {
    const customers = await mongoDBService.getAllCustomers();
    const customerId = customers[0]._id; // Get the ID of the first customer

    const retrievedCustomer = await mongoDBService.getCustomerById(customerId);

    // Assert that a customer with the specified ID is retrieved
    expect(retrievedCustomer).toBeDefined();
    expect(retrievedCustomer._id).toEqual(customerId);
  });

  // Test the updateCustomer() method
  it('should update a customer', async () => {
    const customers = await mongoDBService.getAllCustomers();
    const customerId = customers[0]._id; // Get the ID of the first customer
    const updatedData = { name: 'Updated Name' };

    const updatedCustomer = await mongoDBService.updateCustomer(customerId, updatedData);

    // Assert that the customer is updated with the specified data
    expect(updatedCustomer).toBeDefined();
    expect(updatedCustomer.name).toBe('Updated Name');
  });

  // Test the deleteCustomer() method
  it('should delete a customer', async () => {
    const customers = await mongoDBService.getAllCustomers();
    const customerId = customers[0]._id; // Get the ID of the first customer

    const deletionResult = await mongoDBService.deleteCustomer(customerId);

    // Assert that the deletion message indicates success
    expect(deletionResult.message).toBe('Success deletion customer');
  });

  // Test the testConnection() method
  it('should test the database connection status', async () => {
    // Call the testConnection() method of MongoDBService
    const isConnected = await mongoDBService.testConnection();

    // Assert that the connection status is as expected
    expect(isConnected).toBe(true); // Connection should be successful
  });
});
