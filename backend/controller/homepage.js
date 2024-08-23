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
  

  exports.getImage = async (req, res) => {
    try {
      // Extract the slug from the request query
      const { slug } = req.params;
  
      if (!slug) {
        return res.status(400).json({ message: 'Slug is required' });
      }
  
      // Find the category that matches the provided slug
      const category = await ServiceCategory.findOne({ slug })
        .select('category photo -_id');
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Map to get an object with category name and photo
      const categoryDetails = {
        name: category.category,
        photo: category.photo
      };
  
      res.status(200).json(categoryDetails);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  