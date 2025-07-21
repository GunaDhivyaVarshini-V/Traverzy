const Package = require('../models/packages');
exports.renderAddPackage = async (req, res) => {
  try {
    res.render("travelAgent");
  } catch (error) {
    res.status(500).json({ message: "Error rendering add packages page", error });
  }
};


exports.uploadPackage = async (req, res) => {
  try {
    const {
      name, category, destination, description,
      price, discount, availableSeats,
      startDate, endDate, days, nights, season,
      foodPreferences, agentName,
      flights = '[]', hotels = '[]', activities = '[]', transportation = '[]'
    } = req.body;

    const images = req.files.map(file => '/images/' + file.filename);

    const newPackage = new Package({
      name,
      description,
      category,
      destination,
      price,
      discount,
      availableSeats,
      startDate,
      endDate,
      days,
      nights,
      season,
      foodPreferences: Array.isArray(foodPreferences) ? foodPreferences : [foodPreferences],
      agentName: agentName || "Agent Rina",
      images,
      flights: JSON.parse(flights),
      hotels: JSON.parse(hotels),
      activities: JSON.parse(activities),
      transportation: JSON.parse(transportation)
    });

    await newPackage.save();
    res.status(201).json({ success: true, message: 'Package uploaded successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
