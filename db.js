const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('room_server', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // You can use 'mysql', 'postgres', 'sqlite', or 'mariadb'
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
