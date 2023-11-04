const express = require('express');
const router = express.Router();
const propertyController = require('../controller/property_controller');
const multer = require('multer');



// Route to add a new property
router.post('/addProperty', propertyController.addProperty); // Ensure that `addProperty` is a valid function in your controller

// Route to update an existing property by property_id
router.post('/updateProperty/:property_id', propertyController.updateProperty);

// Route to fetch and display all stored properties
router.post('/showProperties', propertyController.showProperties);

// Route to retrieve properties with a specific status
router.post('/getPropertiesByStatus', propertyController.getPropertiesByStatus);

// Route to retrieve properties by status_vendor
router.post('/getPropertiesByStatusVendor', propertyController.getPropertiesByStatusVendor);

// Route to update the status of a property by property_id
router.post('/updateStatus/:property_id', propertyController.updateStatus);

// Route to update the status_vendor of a property by property_id
router.post('/updateStatusVendor/:property_id', propertyController.updateStatusVendor);

// Retrieve properties with a specific vendor_id
router.post('/getvendorProperties', propertyController.getVendorProperties);


module.exports = router;
