const express = require('express');
const router = express.Router();

const {insertTestimonial, getTestimonials,getTestimonialRating, updateTestimonial,deleteTestimonial,getTestimonialsFront, getTestimonialById,countTestimonial,deletePhotoAndAltText,deleteVideoAndAltText,getTestimonialsHigh} = require('../controller/testimonial');
const { uploadMedia } = require('../middleware/uploadMedia');
const { requireAuth } = require('../middleware/authmiddleware');


router.post('/insertTestinomial',requireAuth,uploadMedia , insertTestimonial);
router.get('/getTestimonial' , getTestimonials);
router.put('/updateTestimonial',requireAuth,uploadMedia, updateTestimonial)
router.delete('/deleteTestimonial' ,requireAuth, deleteTestimonial)
router.get('/getTestimonialById', requireAuth,getTestimonialById)
router.get('/countTestimonial',requireAuth, countTestimonial)
router.delete('/:id/image/:imageFilename/:index',requireAuth, deletePhotoAndAltText)
router.delete('/testimonial/:id/video/:videoFilename', deleteVideoAndAltText);
router.get('/getTestimonialsHigh',getTestimonialsHigh)

router.get('/getTestimonialsFront' , getTestimonialsFront);
router.get('/getTestimonialRating' , getTestimonialRating);


module.exports = router;