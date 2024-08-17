const express = require('express');
const router = express.Router();

const {
    insertServiceDetail,
    getServiceDetailsByCategory, // Updated to only fetch by category
    updateServiceDetail,
    deleteServiceDetail,
    getServiceDetailById,
    countServiceDetailsByCategory, // Count by category
    deletePhotoAndAltText,
    deleteVideoAndAltText,deleteQuestionFromServiceDetail,getServiceDetailsByslug
} = require('../controller/serviceDetails');
const { uploadMedia } = require('../middleware/uploadMedia');
const { requireAuth } = require('../middleware/authmiddleware');

router.post('/insertServiceDetail', requireAuth, uploadMedia, insertServiceDetail);
router.get('/getServiceDetails', requireAuth, getServiceDetailsByCategory);
router.put('/updateServiceDetail', requireAuth, uploadMedia, updateServiceDetail);
router.delete('/deleteServiceDetail', requireAuth, deleteServiceDetail);
router.get('/getServiceDetailById', requireAuth, getServiceDetailById);
router.get('/countServiceDetails', requireAuth, countServiceDetailsByCategory);
router.delete('/:id/image/:imageFilename/:index', requireAuth, deletePhotoAndAltText);
router.delete('/serviceDetail/:id/video/:videoFilename', requireAuth, deleteVideoAndAltText);
router.delete('/:serviceDetailId/questions/:questionId', deleteQuestionFromServiceDetail);
router.get('/front/:slug',getServiceDetailsByslug)
module.exports = router;
