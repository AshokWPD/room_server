const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./db'); // Initialize your Sequelize instance here
const authRoutes = require('./routes/user');


// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


sequelize.sync();

// Define routes
app.use('/api/auth', authRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
