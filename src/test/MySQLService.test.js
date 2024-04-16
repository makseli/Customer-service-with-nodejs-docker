// test/MySQLService.test.js

const MySQLService = require('../services/MySQLService');

// Using Jest to test the MySQLService class
describe('MySQLService', () => {
  let mySQLService;
  let testCustomerId;

  // Setup before running the tests
  beforeAll(async () => {
    // Instantiate an instance of the MySQLService class
    mySQLService = new MySQLService();

    // Create a test customer for fetching by ID in subsequent tests
    const customerData = {
      name: 'Test Customer',
      email: 'test@example.com'
    };
    const createdCustomer = await mySQLService.createCustomer(customerData);
    testCustomerId = createdCustomer.id;
  });

  // Cleanup after running all the tests
  afterAll(async () => {
    // Delete the test customer created during setup
    await mySQLService.deleteCustomer(testCustomerId);
  });

  // Test the getCustomerById() method
  it('should retrieve a customer by ID', async () => {
    const retrievedCustomer = await mySQLService.getCustomerById(testCustomerId);

    // Assert that a customer with the specified ID is retrieved
    expect(retrievedCustomer).toBeDefined();
    expect(retrievedCustomer.id).toBe(testCustomerId);
    expect(retrievedCustomer.name).toBe('Test Customer');
    expect(retrievedCustomer.email).toBe('test@example.com');
  });

  // Test the updateCustomer() method
  it('should update a customer', async () => {
    const customers = await mySQLService.getAllCustomers();
    const customerId = customers[0].id; // Get the ID of the first customer

    const updatedData = { name: 'Updated Name', email: 'updated@example.com' };
    const updatedCustomer = await mySQLService.updateCustomer(customerId, updatedData);

    // Assert that the customer is updated with the specified data
    expect(updatedCustomer).toBeDefined();
    expect(updatedCustomer.id).toBe(customerId);
    expect(updatedCustomer.name).toBe('Updated Name');
    expect(updatedCustomer.email).toBe('updated@example.com');
  });

  // Test the deleteCustomer() method
  it('should delete a customer', async () => {
    const customers = await mySQLService.getAllCustomers();
    const customerId = customers[0].id; // Get the ID of the first customer

    const deletionResult = await mySQLService.deleteCustomer(customerId);

    // Assert that the deletion message indicates success
    expect(deletionResult.message).toBe('Customer deleted successfully');
  });

  // Test the testConnection() method
  it('should test the database connection status', async () => {
    // Call the testConnection() method of MySQLService
    const isConnected = await mySQLService.testConnection();

    // Assert that the connection status is as expected
    expect(isConnected).toBe(true); // Connection should be successful
  });
});
