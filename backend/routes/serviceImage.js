const express = require('express');
const router = express.Router();
const galleryController = require('../controller/serviceImages'); // Adjust the path as needed
const { uploadImage } = require('../middleware/imageUpload'); // Adjust the path as needed
const { requireAuth } = require('../middleware/authmiddleware'); // Adjust the path as needed

// Get all images with optional categoryId and photoType filters
router.get('/getGallery', requireAuth, galleryController.getAllImages);

// Add a new image
router.post('/createGallery', requireAuth, uploadImage, galleryController.addNewImage);

// Delete an image by ID, categoryId, and photoType
router.delete('/deleteGallery', requireAuth, galleryController.deleteImage);

// Get a single image by ID, categoryId, and photoType
router.get('/getGalleryById', requireAuth, galleryController.getSingleImage);

// Download an image by filename
router.get('/download/:filename', galleryController.downloadImage);

// Update an image by ID
router.put('/updateGallery', requireAuth, uploadImage, galleryController.updateImage);

// Get gallery by ID, categoryId, and photoType
router.get('/gallery/:id', requireAuth, galleryController.getGalleryById);
 
router.get('/front/:slug/:photoType',galleryController.getAllImagesSlug)
router.get('/getAllPackagesFront',galleryController.getAllPackagesFront)
router.get('/companyImages', galleryController.getAllCompanyImages);

module.exports = router;
