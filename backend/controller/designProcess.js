const DesignProcess = require('../model/designProcess'); // Update to the correct model path
const path = require('path');
const fs = require('fs');
const ServiceCategory = require('../model/serviceCategory')
const insertDesignProcess = async (req, res) => {
    try {
      const {
        title,
        subheading,
        description,
        hours,
        priority,
        categoryId, // Extract categoryId from the request body
        alt, // Extract alt text for the image
      } = req.body;
  
      console.log(req.body);
  
      // Assuming image is uploaded as a file
      const image = req.file ? req.file.filename : null; // Get the filename of the uploaded image
  
      // Fetch the category and get the slug
      const category = await ServiceCategory.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Extract the slug from the category
      const slug = category.slug;
  
      // Create a new DesignProcess with the slug field
      const designProcess = new DesignProcess({
        title,
        subheading,
        description,
        hours,
        priority,
        image, // Store binary image data
        alt, // Store alternative text
        category: categoryId, // Assign categoryId to category field
        slug, // Store the slug in the DesignProcess model
      });
  
      await designProcess.save();
      return res.status(201).send({ message: 'Design process created successfully', designProcess });
    } catch (error) {
      console.error("Error inserting design process:", error);
      res.status(400).send(error);
    }
  };
  

const getDesignProcesses = async (req, res) => {
    try {
        const { page = 1, categoryId } = req.query; // Get categoryId from query parameters
        const limit = 5; // Number of records per page

        const query = categoryId ? { category: categoryId } : {}; // Build query

        const count = await DesignProcess.countDocuments(query); // Count total documents based on query

        const designProcesses = await DesignProcess.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            data: designProcesses,
            total: count,
            currentPage: page,
            hasNextPage: count > page * limit,
        });
    } catch (error) {
        console.error("Error retrieving design processes:", error);
        res.status(500).json({ message: 'Error fetching design processes' });
    }
};

const getDesignProcessesBySlug = async (req, res) => {
    try {
        const { slug } = req.params; // Get slug from query parameters

        // Build query to find documents by slug
        const query = slug ? { slug } : {};

        // Find documents based on the query
        const designProcesses = await DesignProcess.find(query);

        // Respond with the data
        res.status(200).json({
            data: designProcesses,
        });
    } catch (error) {
        console.error("Error retrieving design processes:", error);
        res.status(500).json({ message: 'Error fetching design processes' });
    }
};


// Download an image
const downloadImage = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'File download failed' });
        }
    });
};

const updateDesignProcess = async (req, res) => {
    const { processId } = req.query; // Assuming ID is passed as a query parameter
    let updateFields = req.body;

    try {
        const existingDesignProcess = await DesignProcess.findById(processId);

        if (!existingDesignProcess) {
            return res.status(404).json({ message: 'Design process not found' });
        }

        // Update image if provided
        if (req.file) { // Check for a single file
            updateFields.image = req.file.filename; // Store new image binary
            updateFields.alt = req.body.alt; // Update alternative text
        } else {
            updateFields.image = existingDesignProcess.image; // Preserve existing image if not updated
            updateFields.alt = existingDesignProcess.alt; // Preserve existing alt text if not updated
        }

        const updatedDesignProcess = await DesignProcess.findByIdAndUpdate(
            processId,
            updateFields,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedDesignProcess);
    } catch (error) {
        console.error("Error updating design process:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};


const deleteDesignProcess = async (req, res) => {
    try {
        const { id } = req.query;

        const designProcess = await DesignProcess.findById(id);

        if (!designProcess) {
            return res.status(404).send({ message: 'Design process not found' });
        }

        await DesignProcess.findByIdAndDelete(id);

        res.status(200).send({ message: "Design process deleted successfully" });
    } catch (error) {
        console.error("Error deleting design process:", error);
        res.status(400).send(error);
    }
};

const getDesignProcessById = async (req, res) => {
    try {
        const { processId } = req.query;

        const designProcess = await DesignProcess.findById(processId);

        if (!designProcess) {
            return res.status(404).json({ message: 'Design process not found' });
        }
        res.status(200).json({ data: designProcess });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const countDesignProcesses = async (req, res) => {
    try {
        const { categoryId } = req.query; // Optionally filter by category
        const query = categoryId ? { category: categoryId } : {};

        const count = await DesignProcess.countDocuments(query);
        res.status(200).json({ total: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error counting design processes' });
    }
};

const deletePhoto = async (req, res) => {
    const { id, imageFilename } = req.params;
   console.log(id, imageFilename)
    try {
        const designProcess = await DesignProcess.findById(id);

        if (!designProcess) {
            return res.status(404).json({ message: 'Design process not found' });
        }

        // Remove the image reference
        if (designProcess.image) {
            designProcess.image = null; // Remove image reference
        }

        await designProcess.save();

        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    insertDesignProcess,
    getDesignProcesses,
    updateDesignProcess,
    deleteDesignProcess,
    getDesignProcessById,
    countDesignProcesses,
    deletePhoto,
    downloadImage,
    getDesignProcessesBySlug
};
