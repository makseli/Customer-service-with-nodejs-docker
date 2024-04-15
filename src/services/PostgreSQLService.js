// src/services/PostgreSQLService.js

const DatabaseService = require('./DatabaseService');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

class PostgreSQLService extends DatabaseService {
  constructor() {
    super(); // DatabaseService call constructor

    // PostgreSQL create conn. pool
    this.pool = new Pool({
      connectionString: process.env.POSTGRES_URI,
    });

    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async getAllCustomers() {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM customers');
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getCustomerById(id) {
    const client = await this.pool.connect();
    try {
      const result = await client.query('SELECT * FROM customers WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async createCustomer(customerData) {
    const { name, email } = customerData;
    const client = await this.pool.connect();
    try {
      const result = await client.query('INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateCustomer(id, customerData) {
    const { name, email } = customerData;
    const client = await this.pool.connect();
    try {
      const result = await client.query('UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteCustomer(id) {
    const client = await this.pool.connect();
    try {
      await client.query('DELETE FROM customers WHERE id = $1', [id]);
      return { message: 'Customer deleted successfully' };
    } finally {
      client.release();
    }
  }

  async testConnection() {
    // Check db conn.
    try {
      // PostgreSQL conn check with query
      const result = await this.pool.query('SELECT 1');
      if (result.rows.length > 0 && result.rows[0].hasOwnProperty('1')) {
        console.log('PostgreSQL connection is active.');
      }

      console.log('Database connection is active.');
      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }
}

module.exports = PostgreSQLService;
