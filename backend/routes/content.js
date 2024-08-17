const express = require('express');
const router = express.Router();
const {
    insertContent,
    getAllContent,
    getContentByType,
    updateContent,
    updateQuestions,
    updateSubsections,addQuestions,addSubsection
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
router.put('/content/update/subsections/:id', uploadMedia,updateSubsections);
router.post('/update/questions/:id',addQuestions)
router.post("/add/subsections/:id",uploadSub,addSubsection)



module.exports = router;
