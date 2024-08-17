const ServiceDetails = require('../model/servicedetails');
const path = require('path');
const fs = require('fs');

// Update service detail by ID and ensure categoryId is considered
const ServiceCategory = require('../model/serviceCategory'); // Import the ServiceCategory model

const getServiceDetailsByslug = async (req, res) => {
  const { slug } = req.params; // Get slug from query parameters

  try {
    // Find all service details by slug
    const serviceDetails = await ServiceDetails.find({ slug: slug })
      // Populate category field if needed

    // Return data in array form with total count
    res.status(200).json({
      data: serviceDetails,
      total: serviceDetails.length, // Total count of service details
    });
  } catch (error) {
    console.error("Error retrieving service details:", error);
    let errorMessage = 'Error fetching service details';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage });
  }
};





const insertServiceDetail = async (req, res) => {
  try {
    const {
      heading,
      description,
      priority,
      questions, // Should now be an array of strings
      status,
      alt,
      altVideo,
      categoryId,
    } = req.body;

    console.log(req.body);

    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
    const video = req.files['video'] ? req.files['video'][0].filename : '';

    // Parse questions from string to object
    const parsedQuestions = questions.map(question => JSON.parse(question));

    // Find the category and get the slug
    const category = await ServiceCategory.findById(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Extract the slug from the category
    const slug = category.slug;

    // Create serviceDetail with parsed questions and slug
    const serviceDetail = new ServiceDetails({
      heading,
      description,
      priority,
      questions: parsedQuestions, // Use parsed questions array
      category: categoryId,
      slug, // Store the slug from the category
      status,
      alt,
      altVideo,
      photo,
      video,
    });

    await serviceDetail.save();
    return res.status(201).send({ message: 'Data sent successfully', serviceDetail });
  } catch (error) {
    console.error("Error inserting service detail:", error);
    res.status(400).send(error);
  }
};

  
  
  

// Get all service details by category with pagination
const getServiceDetailsByCategory = async (req, res) => {
    try {
      const { categoryId } = req.query; // Get categoryId from query parameters
      const { page = 1 } = req.query; // Get the current page from query parameters
      const limit = 5; // Number of records per page
  
      // Count the documents based on the category reference
      const count = await ServiceDetails.countDocuments({ category: categoryId }); 
  
      // Find service details by category reference with pagination
      const serviceDetails = await ServiceDetails.find({ category: categoryId })
        .populate('category') // Populate category field if needed
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.status(200).json({
        data: serviceDetails,
        total: count,
        currentPage: page,
        hasNextPage: count > page * limit
      });
    } catch (error) {
      console.error("Error retrieving service details:", error);
      let errorMessage = 'Error fetching service details';
      if (error.name === 'CastError') {
        errorMessage = 'Invalid query parameter format';
      }
      res.status(500).json({ message: errorMessage });
    }
  };
  


// Update service detail by ID and ensure categoryId is considered
const updateServiceDetail = async (req, res) => {
  const { id } = req.query;
  let updateFields = req.body;

  try {
    const existingServiceDetail = await ServiceDetails.findById(id);

    if (!existingServiceDetail) {
      return res.status(404).json({ message: 'Service detail not found' });
    }

    // If categoryId is provided, find the category and get the slug
    if (updateFields.categoryId) {
      const category = await ServiceCategory.findById(updateFields.categoryId);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      // Extract the slug from the category and add it to updateFields
      updateFields.slug = category.slug;
    } else {
      // If categoryId is not provided, keep the existing slug
      updateFields.slug = existingServiceDetail.slug;
    }

    // Handle photo uploads
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename);
      updateFields.photo = [...existingServiceDetail.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existingServiceDetail.photo;
    }

    // Handle video upload
    if (req.files && req.files['video'] && req.files['video'].length > 0) {
      const newVideoPath = req.files['video'][0].filename;
      updateFields.video = newVideoPath;
    } else {
      updateFields.video = existingServiceDetail.video;
    }

    // Parse questions from strings to objects if questions are provided
    if (updateFields.questions) {
      updateFields.questions = updateFields.questions.map(question => JSON.parse(question));
    } else {
      updateFields.questions = existingServiceDetail.questions;
    }

    // Handle alt text updates
    if (!updateFields.alt) {
      updateFields.alt = existingServiceDetail.alt;
    }

    // Handle altVideo text updates
    if (!updateFields.altVideo) {
      updateFields.altVideo = existingServiceDetail.altVideo;
    }

    // Handle status updates
    if (updateFields.status === undefined) {
      updateFields.status = existingServiceDetail.status;
    }

    const updatedServiceDetail = await ServiceDetails.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedServiceDetail);
  } catch (error) {
    console.error("Error updating service detail:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};


  const deleteQuestionFromServiceDetail = async (req, res) => {
    const { serviceDetailId, questionId } = req.params;
  
    try {
      // Find the service detail document by ID
      const serviceDetail = await ServiceDetails.findById(serviceDetailId);
  
      if (!serviceDetail) {
        return res.status(404).json({ message: 'Service detail not found' });
      }
  
      // Find the index of the question to be deleted
      const questionIndex = serviceDetail.questions.findIndex(
        question => question._id.toString() === questionId
      );
  
      if (questionIndex === -1) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Remove the question from the array
      serviceDetail.questions.splice(questionIndex, 1);
  
      // Save the updated service detail document
      await serviceDetail.save();
  
      res.status(200).json({ message: 'Question deleted successfully', serviceDetail });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: 'Server error', error });
    }
  };



// Delete service detail by ID
const deleteServiceDetail = async (req, res) => {
  try {
    const { id } = req.query;

    const serviceDetail = await ServiceDetails.findById(id);

    if (!serviceDetail) {
      return res.status(404).send({ message: 'Service detail not found' });
    }

    // Delete associated photos
    serviceDetail.photo.forEach(filename => {
      const filePath = path.join(__dirname, '../images', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found: ${filename}`);
      }
    });

    await ServiceDetails.findByIdAndDelete(id);

    res.send({ message: "Service detail deleted successfully" }).status(200);
  } catch (error) {
    console.error("Error deleting service detail:", error);
    res.status(400).send(error);
  }
};

// Get service detail by ID
const getServiceDetailById = async (req, res) => {
  try {
    const { id } = req.query;

    const serviceDetail = await ServiceDetails.findById(id).populate('category');

    if (!serviceDetail) {
      return res.status(404).json({ message: 'Service detail not found' });
    }
    res.status(200).json({ data: serviceDetail });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Count total service details for a specific category
const countServiceDetailsByCategory = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const count = await ServiceDetails.countDocuments({ categoryId });
    res.status(200).json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error counting service details' });
  }
};

// Delete photo and alt text
const deletePhotoAndAltText = async (req, res) => {
  const { id, imageFilename, index } = req.params;

  try {
    const serviceDetail = await ServiceDetails.findById(id);

    if (!serviceDetail) {
      return res.status(404).json({ message: 'Service detail not found' });
    }

    // Remove the photo and its alt text
    serviceDetail.photo = serviceDetail.photo.filter(photo => photo !== imageFilename);
    serviceDetail.alt.splice(index, 1);

    await serviceDetail.save();

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete video and alt text
const deleteVideoAndAltText = async (req, res) => {
  const { id, videoFilename } = req.params;

  try {
    const serviceDetail = await ServiceDetails.findById(id);

    if (!serviceDetail) {
      return res.status(404).json({ message: 'Service detail not found' });
    }

    if (serviceDetail.video === videoFilename) {
      serviceDetail.video = null; // Remove the video reference
    }

    if (serviceDetail.altVideo && serviceDetail.altVideo.length > 0) {
      serviceDetail.altVideo.pop();
    }

    await serviceDetail.save();

    const filePath = path.join(__dirname, '..', 'videos', videoFilename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Video and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting video and alt text:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  insertServiceDetail,
  getServiceDetailsByCategory, // Updated to only fetch by category
  updateServiceDetail,
  deleteServiceDetail,
  getServiceDetailById,
  countServiceDetailsByCategory, // Count by category
  deletePhotoAndAltText,
  deleteVideoAndAltText,deleteQuestionFromServiceDetail,getServiceDetailsByslug
};
