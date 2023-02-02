const express = require('express');
const config = require('./config');
const { sequelize } = require('./sequelize-client');
const routers = require('./modules');

// Create Express App
const app = express();

// Configure Express App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);

// Add Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to elRed.io!' });
});

sequelize.sync().then(async () => {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}/`);
  });

  return true;
}).catch(error => {
  console.log('DB SYNC ERROR', error);
});