const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  waitForConnections: true,
  // You can use 'mysql', 'postgres', 'sqlite', or 'mariadb'
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







// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('absolu38_Absolute_stay', 'absolu38_absolutestay', 'AbsoluteStay#21', {
//   host: 'localhost',
//   dialect: 'mysql', // You can use 'mysql', 'postgres', 'sqlite', or 'mariadb'
// });

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('DB connected');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('room_server', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql', // You can use 'mysql', 'postgres', 'sqlite', or 'mariadb'
// });

// // Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('DB connected');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;