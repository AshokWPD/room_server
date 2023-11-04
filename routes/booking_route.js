const express = require('express');
const router = express.Router();
const bookingController = require('../controller/booking_controller');

// Route to add a new booking
router.post('/addBooking', bookingController.addBooking);

// Route to fetch and display all stored bookings
router.post('/showBookings', bookingController.showBookings);

// Route to fetch a user by user_id
router.post('/getUserBooking', bookingController.getUserBookings);

// Route to update a booking by booking_id
router.post('/updatePayment', bookingController.updateBookingpay);

// Route to get vendor data by vendor_id
router.post('/getVendorBooking', bookingController.getVendorById);

// Route to update the status of a booking by booking_id
router.post('/updateBookingStatus', bookingController.updateBookingStatus);

module.exports = router;
