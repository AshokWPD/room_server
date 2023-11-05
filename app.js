const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require('./db'); // Initialize your Sequelize instance here
const authRoutes = require('./routes/user');
const appPropertyRoutes = require('./routes/property_route'); // AppProperty routes
const tickerIssueRoutes = require('./routes/ticket-rout'); 
const favouriteRoutes = require('./routes/favourite_routes'); 
const bookingRoutes = require('./routes/booking_route'); 


// Middleware to parse JSON data
app.use(bodyParser.json({ limit: '300mb' }));
app.use(express.json({ limit: "300mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: '300mb' }));


sequelize.sync();

// Define routes
app.use('/api', authRoutes);
app.use('/api', appPropertyRoutes); // AppProperty routes
app.use('/api', tickerIssueRoutes);
app.use('/api', favouriteRoutes);
app.use('/api', bookingRoutes);




// Start the server
app.listen(port,()=>console.log('your server is running!!!'));


