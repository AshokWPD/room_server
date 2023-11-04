// routes/tickerIssueRouter.js
const express = require('express');
const router = express.Router();
const tickerIssueController = require('../controller/ticket_controller');

// Route to create a new ticket issue
router.post('/createTickerIssue', tickerIssueController.createTickerIssue);

// Route to update the status and reply message of a ticket issue
router.put('/updateTicketIssue/:ticket_id', tickerIssueController.updateTicketIssue);

// Route to get a ticket issue by ticket_id
// Route to get the full table data based on hotel_id
router.post('/getByproperty', tickerIssueController.getFullTableDataByHotel);

// Route to get the full table data based on ticket_id
router.post('/getByTicket', tickerIssueController.getFullTableDataByTicket);


router.post('/getByuserId', tickerIssueController.getFullTableDataByEmail);

// Route to get data where isAdmin is true
router.post('/getAdminIssues', tickerIssueController.getAdminIssues);


module.exports = router;
