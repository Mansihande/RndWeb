const ServiceImage = require('../model/serviceImages'); // Assuming this is your model path
const ServiceCategory = require('../model/serviceCategory'); // Ensure you have the ServiceCategory model imported
const path = require('path');
const fs = require('fs');

// Get all images with category names, filter by categoryId and photoType if provided
exports.getAllImages = async (req, res) => {
    try {
        const { categoryId, photoType } = req.query; // Get categoryId and photoType from query params
        const filter = {};
        console.log(categoryId, photoType)
        if (photoType) {
            filter.photoType = photoType;
        }

        if (categoryId) {
            filter.categoryId = { $in: categoryId.split(',') }; // Handle multiple category IDs if they are comma-separated
        }

        const images = await ServiceImage.find(filter).populate('categoryId', 'category'); // Populate the categoryId

        const galleryWithCategoryNames = images.map(image => ({
            ...image.toJSON(),
            categoryName: image.categoryId.length ? image.categoryId.map(cat => cat.category).join(', ') : "Uncategorized"
        }));

        res.status(200).json(galleryWithCategoryNames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllImagesSlug = async (req, res) => {
    try {
        const { slug, photoType } = req.params; // Extract from URL params
        console.log("Received parameters:", { slug, photoType });

        // Create filter object based on provided parameters
        const filter = {};
        if (photoType) {
            filter.photoType = photoType;
        }
        if (slug) {
            filter.slug = slug;
        }

        // Fetch images based on the filter
        const images = await ServiceImage.find(filter).populate('categoryId', 'category');

        // Format the images to include category names
        const galleryWithCategoryNames = images.map(image => ({
            ...image.toJSON(),
            categoryName: image.categoryId.length ? image.categoryId.map(cat => cat.category).join(', ') : "Uncategorized"
        }));

        // Respond with the formatted image data
        res.status(200).json(galleryWithCategoryNames);
    } catch (err) {
        console.error("Error retrieving images:", err);
        res.status(500).json({ message: err.message });
    }
};




exports.addNewImage = async (req, res) => {
    try {
        console.log(req.body.categoryId);
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const image = req.file.filename;
        const alt = req.body.alt;
        const categoryId = req.body.categoryId; // Expecting an array of category IDs
        const photoType = req.body.photoType; // Expecting the photo type

        // Validate photoType and categoryId
        if (!['project', 'company'].includes(photoType)) {
            return res.status(400).json({ message: 'Invalid photoType' });
        }

        // Fetch the category and get the slug
        const category = await ServiceCategory.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Extract the slug from the category
        const slug = category.slug;

        // Create a new ServiceImage with the slug field
        const newImage = new ServiceImage({ images: image, alt, categoryId, photoType, slug });
        await newImage.save();

        res.status(200).json({ message: 'Image uploaded successfully', image, alt, categoryId, photoType, slug });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete an image
exports.deleteImage = async (req, res) => {
    try {
        const { id, categoryId, photoType } = req.query; // Get categoryId and photoType from query params
        const image = await ServiceImage.findById(id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Optionally check if image belongs to the specified categoryId and photoType before deletion
        if (categoryId && !image.categoryId.includes(categoryId)) {
            return res.status(403).json({ message: 'Forbidden: Image does not belong to the specified category' });
        }

        if (photoType && image.photoType !== photoType) {
            return res.status(403).json({ message: 'Forbidden: Image does not match the specified photo type' });
        }

        const filePath = path.join(__dirname, '../uploads', image.images);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn(`File not found: ${image.images}`);
        }

        await ServiceImage.findByIdAndDelete(id);
        res.status(200).json({ message: 'Record deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single image by ID
exports.getSingleImage = async (req, res) => {
    const { id, categoryId, photoType } = req.query; // Get categoryId and photoType from query params

    try {
        const image = await ServiceImage.findById(id).populate('categoryId', 'category'); // Populate to get category names

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

     

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Download an image
exports.downloadImage = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    // Check if the file exists before attempting to download
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('File not found:', err);
            return res.status(404).json({ message: 'File not found' });
        }

        // Send the file for download
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                return res.status(500).json({ message: 'File download failed' });
            }
        });
    });
};




// Update an image
exports.updateImage = async (req, res) => {
    try {
        const { id } = req.query;
        const { alt, photoType } = req.body;
        let images;

        // Validate photoType
        if (photoType && !['project','company'].includes(photoType)) {
            return res.status(400).json({ message: 'Invalid photoType' });
        }

        // Check if a new image is uploaded
        if (req.file) {
            images = req.file.filename; // Use the new image file name
        }

        const updateData = {
            alt,
            photoType
        };

        // Include images only if a new file is uploaded
        if (images) {
            updateData.images = images;
        }

        const updatedImage = await ServiceImage.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.json({ message: 'Image updated successfully', updatedImage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get gallery by ID
exports.getGalleryById = async (req, res) => {
    const { id, categoryId, photoType } = req.query; // Get categoryId and photoType from query params
    try {
        // Find the gallery by id, categoryId, and photoType
        const gallery = await ServiceImage.findOne({
            _id: id,
            categoryId: categoryId,
            photoType: photoType
        }).populate('categoryId', 'category'); // Populate to get category names

        // If no gallery is found, return a 404 error
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }

        // Send the gallery document in the response
        res.json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

