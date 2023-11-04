// controllers/tickerIssueController.js
const TickerIssue = require('../model/ticket_issue_model');

// Create a new ticket issue
exports.createTickerIssue = async (req, res) => {
  try {
    const {
      property_id,
      user_name,
      user_id,
      email,
      mobile,
      message,
      description,
      status,
      reply_message,
      isAdmin, // Include the isAdmin field
    } = req.body;
    

    const ticketIssue = await TickerIssue.create({
      property_id,
      user_name,
      user_id,
      email,
      mobile,
      message,
      description,
      status,
      reply_message,
      isAdmin
    });

    return res.status(200).json(ticketIssue);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update the status and reply message of a ticket issue by ticket_id
exports.updateTicketIssue = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status, reply_message, property_id } = req.body; // Include the property_id field

    const ticketIssue = await TickerIssue.findByPk(ticket_id);

    if (!ticketIssue) {
      return res.status(404).json({ message: 'Ticket issue not found' });
    }

    // Update the fields if they are provided in the request
    if (status) {
      ticketIssue.status = status;
    }

    if (reply_message) {
      ticketIssue.reply_message = reply_message;
    }

    if (property_id) {
      ticketIssue.property_id = property_id; // Update the property_id if provided
    }

    await ticketIssue.save();

    return res.status(200).json(ticketIssue);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Retrieve the full table data based on property_id
exports.getFullTableDataByHotel = async (req, res) => {
    try {
      const { property_id } = req.body;
  
      if (!property_id) {
        return res.status(400).json({ message: 'property_id is required in the request body' });
      }
  
      // Find all ticket issues with the provided property_id
      const ticketIssues = await TickerIssue.findAll({
        where: { property_id },
      });
  
      return res.status(200).json(ticketIssues);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Retrieve the full table data based on ticket_id
  exports.getFullTableDataByTicket = async (req, res) => {
    try {
      const { ticket_id } = req.body;
  
      if (!ticket_id) {
        return res.status(400).json({ message: 'ticket_id is required in the request body' });
      }
  
      // Find the ticket issue by ticket_id
      const ticketIssue = await TickerIssue.findByPk(ticket_id);
  
      if (!ticketIssue) {
        return res.status(404).json({ message: 'Ticket issue not found' });
      }
  
      return res.status(200).json(ticketIssue);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  // Retrieve all data based on email
exports.getFullTableDataByEmail = async (req, res) => {
    try {
      const { user_id } = req.body;
  
      if (!user_id) {
        return res.status(400).json({ message: 'user_id is required in the request body' });
      }
  
      // Find all ticket issues with the provided email
      const ticketIssues = await TickerIssue.findAll({
        where: { user_id },
      });
  
      return res.status(200).json(ticketIssues);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


// Retrieve data where isAdmin is true
exports.getAdminIssues = async (req, res) => {
  try {
    const { isAdmin } = req.body;

    if (isAdmin !== true) {
      return res.status(400).json({ message: 'isAdmin should be true in the request body' });
    }

    // Find all ticket issues where isAdmin is true
    const adminIssues = await TickerIssue.findAll({
      where: { isAdmin: true },
    });

    return res.status(200).json(adminIssues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
