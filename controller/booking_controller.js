const Booking = require('../model/booking_model');

// Create a new booking
exports.addBooking = async (req, res) => {
  try {
    const {
        subvendor_id,
        user_id,
        property_id,
        UserName,
        memberCount,
        checkinDate,
        checkoutDate,
        priceAmount,
        paymentMode,
        isPaid,
        ticket_id,
        status,
        location,
        vendor_id, // Add vendor_id to the request body
      } = req.body;

    // Generate booking_id as 'BKxxx'
    const lastBooking = await Booking.findOne({
      order: [['createdAt', 'DESC']],
    });
    let booking_id = 'BK001';
    if (lastBooking) {
      const lastId = parseInt(lastBooking.booking_id.substr(2), 10);
      booking_id = `BK${(lastId + 1).toString().padStart(3, '0')}`;
    }

    const booking = await Booking.create({
        booking_id,
        subvendor_id,
        user_id,
        property_id,
        UserName,
        memberCount,
        checkinDate,
        checkoutDate,
        priceAmount,
        paymentMode,
        isPaid,
        ticket_id,
        status,
        location,
        vendor_id,
      });

    return res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch and display all stored bookings
exports.showBookings = async (req, res) => {
  try {
    const { booking } = req.body;

    if (booking === 'show') {
      const bookings = await Booking.findAll();

      return res.status(200).json(bookings);
    } else {
      return res.status(400).json({ message: 'Invalid request body' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Fetch bookings by user_id
exports.getUserBookings = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required in the request body' });
    }

    // Find all bookings posted by the user
    const bookings = await Booking.findAll({ where: { user_id } });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  // Update the isPaid, paymentMode, and priceAmount for a booking by booking_id
exports.updateBookingpay = async (req, res) => {
    try {
      const { booking_id, isPaid, paymentMode, priceAmount } = req.body;
  
      if (!booking_id) {
        return res.status(400).json({ message: 'booking_id is required in the request body' });
      }
  
      // Find the booking by booking_id
      const booking = await Booking.findOne({ where: { booking_id } });
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Update the booking fields with the new data
      if (isPaid !== undefined) {
        booking.isPaid = isPaid;
      }
      if (paymentMode) {
        booking.paymentMode = paymentMode;
      }
      if (priceAmount) {
        booking.priceAmount = priceAmount;
      }
  
      // Save the updated booking to the database
      await booking.save();
  
      return res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Get vendor data by vendor_id
exports.getVendorById = async (req, res) => {
  try {
    const { vendor_id } = req.body;

    if (!vendor_id) {
      return res.status(400).json({ message: 'vendor_id is required in the request body' });
    }

    // Find all bookings posted by the user
    const bookings = await Booking.findAll({ where: { vendor_id } });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

  // Update the status of a booking by booking_id
exports.updateBookingStatus = async (req, res) => {
    try {
      const { booking_id, status } = req.body;
  
      if (!booking_id || !status) {
        return res.status(400).json({ message: 'Booking ID and Status are required in the request body' });
      }
  
      // Find the booking by booking_id
      const booking = await Booking.findOne({ where: { booking_id } });
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Update the status of the booking
      booking.status = status;
  
      // Save the updated booking to the database
      await booking.save();
  
      return res.status(200).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };