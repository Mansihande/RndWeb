const express = require('express');
const router = express.Router();
const designProcessController = require('../controller/designProcess'); // Adjust path as necessary
const {  uploadImage } = require('../middleware/imageUpload'); // Adjust the path as needed
const { requireAuth } = require('../middleware/authmiddleware'); // Assuming you have this middleware

// Route to insert a new design process
router.post('/insertDesignProcess', requireAuth,  uploadImage, designProcessController.insertDesignProcess);

// Route to get all design processes with pagination
router.get('/category', requireAuth, designProcessController.getDesignProcesses);

// Route to update a design process by ID
router.put('/updateDesignProcess', requireAuth, uploadImage, designProcessController.updateDesignProcess); // ID is passed as a query parameter

// Route to delete a design process by ID
router.delete('/deleteDesignProcess', requireAuth, designProcessController.deleteDesignProcess); // ID is passed as a query parameter

// Route to get a design process by ID
router.get('/getDesignProcessById', requireAuth, designProcessController.getDesignProcessById);

// Route to count total design processes
router.get('/countDesignProcesses', requireAuth, designProcessController.countDesignProcesses);

// Route to delete a photo associated with a design process by ID
router.delete('/:id/photo/:imageFilename', requireAuth, designProcessController.deletePhoto);


router.get("/download/:filename",designProcessController.downloadImage)

router.get("/front/:slug",designProcessController.getDesignProcessesBySlug)
module.exports = router;
