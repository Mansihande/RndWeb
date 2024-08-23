const express = require('express');
const router = express.Router();
const {
    insertContent,
    getAllContent,
    getContentByType,
    updateContent,
    updateQuestions,
    updateSubsections,addQuestions,addSubsection,deletePhotoAndAltText,deleteVideoAndAltText,deleteQuestion,deletesubsection
} = require('../controller/content');
const { uploadSub } = require('../middleware/subSection');

const { requireAuth } = require('../middleware/authmiddleware');
const { uploadMedia } = require('../middleware/uploadMedia');
// In your router file
router.post('/content/:id/questions', addQuestions);

router.post('/:contentType',requireAuth,uploadMedia, insertContent); // Insert new content
router.get('/', requireAuth,getAllContent); // Get all contents
router.get('/type/:contentType',getContentByType); // Get contents by content type
router.put('/:contentType', requireAuth,uploadMedia,updateContent); // Update content by ID
router.put('/update/questions/:id',updateQuestions);
router.put('/subsections/:id', uploadMedia,updateSubsections);
router.post('/update/questions/:id',addQuestions)
router.post("/add/subsections/:id",uploadSub,addSubsection)
router.delete('/deletePhotoAndAltText/:id/:imageFilename/:index',requireAuth, deletePhotoAndAltText)

router.delete('/:id/video/:videoFilename',requireAuth, deleteVideoAndAltText)


// Route to delete a question by index
router.delete('/:id/question/:questionIndex',requireAuth, deleteQuestion);
router.delete('/subsections/:contentId/:index',requireAuth,deletesubsection)


module.exports = router;
