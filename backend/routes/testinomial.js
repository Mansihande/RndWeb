const express = require('express');
const router = express.Router();

const {insertTestimonial, getTestimonials, updateTestimonial,deleteTestimonial, getTestimonialById,countTestimonial,deletePhotoAndAltText,deleteVideoAndAltText} = require('../controller/testimonial');
const { uploadMedia } = require('../middleware/uploadMedia');
const { requireAuth } = require('../middleware/authmiddleware');


router.post('/insertTestinomial',requireAuth,uploadMedia , insertTestimonial);
router.get('/getTestimonial' , requireAuth,getTestimonials);
router.put('/updateTestimonial',requireAuth,uploadMedia, updateTestimonial)
router.delete('/deleteTestimonial' ,requireAuth, deleteTestimonial)
router.get('/getTestimonialById', requireAuth,getTestimonialById)
router.get('/countTestimonial',requireAuth, countTestimonial)
router.delete('/:id/image/:imageFilename/:index',requireAuth, deletePhotoAndAltText)
router.delete('/testimonial/:id/video/:videoFilename', deleteVideoAndAltText);

module.exports = router;