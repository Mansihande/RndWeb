const ServiceCategory = require("../model/serviceCategory") 

exports.getAll = async (req, res) => {
    try {
      const categories = await ServiceCategory.find().select('category -_id');
      
      // Map to get an array of category names
      const categoryNames = categories.map(cat => cat.category);
  
      res.status(200).json(categoryNames);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  exports.getwork = async (req, res) => {
    try {
      // Find and limit the result to 5 categories, selecting category and photo fields
      const categories = await ServiceCategory.find()
        .select('category photo -_id')
        .limit(5);
      
      // Map to get an array of objects with category names and photos
      const categoryDetails = categories.map(cat => ({
        name: cat.category,
        photo: cat.photo
      }));
  
      res.status(200).json(categoryDetails);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  