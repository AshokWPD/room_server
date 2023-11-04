const Property = require('../model/property_model');

// Create a new property
exports.addProperty = async (req, res) => {
  try {
    const {
      property_name,
      vendor_id,
      property_type,
      street_address,
      landmark,
      pincode,
      description,
      price,
      status,
      status_vendor,
      gender,
      features,
      room_images,
      property_image,
      roomType,
      latitude,
      longitude // Add roomType to the destructured request body
    } = req.body;

    // Generate property_id as 'ABxxx'
    const lastProperty = await Property.findOne({
      order: [['createdAt', 'DESC']],
    });
    let property_id = 'AB001';
    if (lastProperty) {
      const lastId = parseInt(lastProperty.property_id.substr(2), 10);
      property_id = `AB${(lastId + 1).toString().padStart(3, '0')}`;
    }

    const property = await Property.create({
      property_id,
      vendor_id,
      property_name,
      property_type,
      street_address,
      landmark,
      pincode,
      description,
      price,
      status,
      status_vendor,
      gender,
      features,
      room_images,
      property_image,
      roomType,
      latitude,
      longitude // Include roomType in the created property
    });

    return res.status(200).json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Update an existing property by property_id
exports.updateProperty = async (req, res) => {
  try {
    const { property_id } = req.params; // Get property_id from URL parameters
    const updatedData = req.body; // Get updated data from request body

    // Find the property by property_id
    const property = await Property.findOne({ where: { property_id } });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update the property's fields with the new data
    for (const key in updatedData) {
      if (Object.prototype.hasOwnProperty.call(updatedData, key)) {
        property[key] = updatedData[key];
      }
    }

    // Save the updated property to the database
    await property.save();

    return res.status(200).json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch and display all stored properties
exports.showProperties = async (req, res) => {
  try {
    const { property } = req.body;

    // Check if the request body contains the expected property key and value
    if (property === 'show') {
      // Retrieve all properties from the database
      const properties = await Property.findAll();

      return res.status(200).json(properties);
    } else {
      return res.status(400).json({ message: 'Invalid request body' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch properties with a specific status
exports.getPropertiesByStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Check if the request body contains the expected "status" key
    if (!status) {
      return res.status(400).json({ message: 'Status is required in the request body' });
    }

    // Retrieve properties with the specified status from the database
    const properties = await Property.findAll({
      where: { status }, // Filter properties by status
    });

    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch properties with a specific status_vendor
exports.getPropertiesByStatusVendor = async (req, res) => {
  try {
    const { status_vendor } = req.body;

    // Check if the request body contains the expected "status_vendor" key
    if (!status_vendor) {
      return res.status(400).json({ message: 'Status Vendor is required in the request body' });
    }

    // Retrieve properties with the specified status_vendor from the database
    const properties = await Property.findAll({
      where: { status_vendor }, // Filter properties by status_vendor
    });

    return res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update the status of a property by property_id
exports.updateStatus = async (req, res) => {
  try {
    const { property_id } = req.params; // Get property_id from URL parameters
    const { status } = req.body; // Get updated status from request body

    // Find the property by property_id
    const property = await Property.findOne({ where: { property_id } });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update the property's status with the new status
    property.status = status;

    // Save the updated property to the database
    await property.save();

    return res.status(200).json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update the status_vendor of a property by property_id
exports.updateStatusVendor = async (req, res) => {
  try {
    const { property_id } = req.params; // Get property_id from URL parameters
    const { status_vendor } = req.body; // Get updated status_vendor from request body

    // Find the property by property_id
    const property = await Property.findOne({ where: { property_id } });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update the property's status_vendor with the new status_vendor
    property.status_vendor = status_vendor;

    // Save the updated property to the database
    await property.save();

    return res.status(200).json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}; 

exports.getVendorProperties = async (req, res) => {
  try {
    const { vendor_id } = req.body;

    const properties = await Property.findAll({
      where: { vendor_id: vendor_id },
    });

    console.log('Fetched properties:', properties); // Add this line

    if (properties && properties.length > 0) {
      return res.status(200).json(properties);
    } else {
      return res.status(404).json({ message: 'No properties found for this vendor.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
