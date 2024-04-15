// src/services/DatabaseService.js

class DatabaseService {
    constructor() {
      if (this.constructor === DatabaseService) {
        throw new Error('Abstract class DatabaseService cannot be instantiated');
      }
    }
  
    async getAllCustomers() {
      throw new Error('getAllCustomers method must be implemented');
    }
  
    async getCustomerById(id) {
      throw new Error('getCustomerById method must be implemented');
    }
  
    async createCustomer(customerData) {
      throw new Error('createCustomer method must be implemented');
    }
  
    async updateCustomer(id, customerData) {
      throw new Error('updateCustomer method must be implemented');
    }
  
    async deleteCustomer(id) {
      throw new Error('deleteCustomer method must be implemented');
    }

    async testConnection(id) {
        throw new Error('testConnection method must be implemented');
      }
  }
  
  module.exports = DatabaseService;
  