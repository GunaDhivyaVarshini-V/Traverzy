const Booking = require('../models/booking');
const Package = require('../models/trending_packages'); 

exports.submitBooking = async (req, res) => {
  const { firstName, lastName, bookingEmail, fromDate, toDate, numPersons, packageId } = req.body;

  try {
   //Find package by ID
    const selectedPackage = await Package.findById(packageId);

    if (!selectedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Create a new booking entry in the db
    const newBooking = new Booking({
      firstName,
      lastName,
      email: bookingEmail,
      fromDate,
      toDate,
      numPersons,
      package: selectedPackage, 
    });

    await newBooking.save(); 
    res.status(201).json({ message: 'Booking successfully created!', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};
