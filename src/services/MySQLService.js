// src/services/MySQLService.js

const DatabaseService = require('./DatabaseService');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class MySQLService extends DatabaseService {
  constructor() {
    super(); // DatabaseService call constructor

    // MySQL create conn. pool
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    });

    this.pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });
  }

  async getAllCustomers() {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM customers', (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async getCustomerById(id) {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM customers WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  async createCustomer(customerData) {
    const { name, email } = customerData;
    return new Promise((resolve, reject) => {
      this.pool.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, name, email });
        }
      });
    });
  }

  async updateCustomer(id, customerData) {
    const { name, email } = customerData;
    return new Promise((resolve, reject) => {
      this.pool.query('UPDATE customers SET name = ?, email = ? WHERE id = ?', [name, email, id], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id, name, email });
        }
      });
    });
  }

  async deleteCustomer(id) {
    return new Promise((resolve, reject) => {
      this.pool.query('DELETE FROM customers WHERE id = ?', [id], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve({ message: 'Customer deleted successfully' });
        }
      });
    });
  }

  async testConnection() {
    // Check db conn. with query
    try {
          
        const query = 'SELECT 1';
        this.pool.query(query, (error, results, fields) => {
          if (error) {
            console.error('Error executing MySQL query:', error);
            return false;
          }
          
          return true;
        });
      
      return true;

    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }
}

  

module.exports = MySQLService;
