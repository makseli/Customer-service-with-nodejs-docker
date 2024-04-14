
# Customer Service with nodejs docker 

This is a customer service application. It is powered by NodeJS and Docker and allows you to use different databases (such as MongoDB, PostgreSQL, or MySQL). Thank you for your contributions.

TODO

- [x] Prepare development environment
- [ ] Endpoint routing work with Express
- [ ] MongoDB implementation
- [ ] Posqresql implementation
- [ ] Mysql implementation
- [ ] Write test :)
- [ ] Run With Docker-Compose for dev. env.
- [ ] Run With Docker-Compose for prod. env.

this-project/
│
├── src/
│ ├── models/
│ │ └── Customer.js # Customer model
│ │
│ ├── services/
│ │ ├── DatabaseService.js # DB Interface
│ │ ├── MongoDBService.js # MongoDB Service  implementation
│ │ └── MySQLService.js # MySQL Service  implementation
│ │
│ └── app.js # Express App
│
├── db/
│ ├── mysql.js # MySQL con. info
│ └── mongoose.js # MongoDB  con. info
│
├── test/
│ └── services/
│ ├── MongoDBService.test.js # MongoDB  service test
│ └── MySQLService.test.js # MySQL service test
│
├── .env # environment variable
├── .gitignore 
└── README.md 

Thanks for your contribution :)
