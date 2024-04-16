// test/PostgreSQLService.test.js

const PostgreSQLService = require('../services/PostgreSQLService');

// Using Jest to test the PostgreSQLService class
describe('PostgreSQLService', () => {
  let postgreSQLService;
  let testCustomerId;

  // Setup before running the tests
  beforeAll(async () => {
    // Instantiate an instance of the PostgreSQLService class
    postgreSQLService = new PostgreSQLService();

    // Create a test customer for fetching by ID and other tests
    const customerData = {
      name: 'Test Customer',
      email: 'test@example.com'
    };
    const createdCustomer = await postgreSQLService.createCustomer(customerData);
    testCustomerId = createdCustomer.id;
  });

  // Cleanup after running all the tests
  afterAll(async () => {
    // Delete the test customer created during setup
    await postgreSQLService.deleteCustomer(testCustomerId);
  });

  // Test the getAllCustomers() method
  it('should retrieve all customers', async () => {
    const customers = await postgreSQLService.getAllCustomers();

    // Assert that customers array is not empty
    expect(customers.length).toBeGreaterThan(0);
  });

  // Test the getCustomerById() method
  it('should retrieve a customer by ID', async () => {
    const retrievedCustomer = await postgreSQLService.getCustomerById(testCustomerId);

    // Assert that a customer with the specified ID is retrieved
    expect(retrievedCustomer).toBeDefined();
    expect(retrievedCustomer.id).toBe(testCustomerId);
    expect(retrievedCustomer.name).toBe('Test Customer');
    expect(retrievedCustomer.email).toBe('test@example.com');
  });

  // Test the createCustomer() method
  it('should create a new customer', async () => {
    const customerData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const createdCustomer = await postgreSQLService.createCustomer(customerData);

    // Assert that the created customer has the expected data
    expect(createdCustomer.name).toBe('John Doe');
    expect(createdCustomer.email).toBe('john@example.com');
    expect(createdCustomer.id).toBeDefined(); // Check if ID is assigned
  });

  // Test the updateCustomer() method
  it('should update a customer', async () => {
    const updatedData = { name: 'Updated Name', email: 'updated@example.com' };
    const updatedCustomer = await postgreSQLService.updateCustomer(testCustomerId, updatedData);

    // Assert that the customer is updated with the specified data
    expect(updatedCustomer).toBeDefined();
    expect(updatedCustomer.id).toBe(testCustomerId);
    expect(updatedCustomer.name).toBe('Updated Name');
    expect(updatedCustomer.email).toBe('updated@example.com');
  });

  // Test the deleteCustomer() method
  it('should delete a customer', async () => {
    const deletionResult = await postgreSQLService.deleteCustomer(testCustomerId);

    // Assert that the deletion message indicates success
    expect(deletionResult.message).toBe('Customer deleted successfully');
  });

  // Test the testConnection() method
  it('should test the database connection status', async () => {
    // Call the testConnection() method of PostgreSQLService
    const isConnected = await postgreSQLService.testConnection();

    // Assert that the connection status is as expected
    expect(isConnected).toBe(true); // Connection should be successful
  });
});
