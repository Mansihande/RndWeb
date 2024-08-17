const Content = require('../model/content'); // Adjust the path to your model

const insertContent = async (req, res) => {
    try {
        const contentType = req.params;
        console.log(contentType);
        const {
            heading,
            subheading,
            description,
            questions,
            subsections,
            status,
            photoAlt,
            videoAlt
        } = req.body;

        const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];
        const video = req.files['video'] ? req.files['video'][0].filename : '';

        const parsedQuestions = questions ? questions.map(q => JSON.parse(q)) : [];

        const newContent = new Content({
            photo,
            video,
            heading,
            subheading,
            description,
            questions: parsedQuestions,
            subsections,
            status,
            contentType: contentType.contentType,
            photoAlt,
            videoAlt
        });

        await newContent.save();
        return res.status(201).json({ message: 'Content created successfully', content: newContent });
    } catch (error) {
        console.error("Error inserting content:", error);
        return res.status(400).json({ message: 'Error inserting content', error });
    }
};

const getAllContent = async (req, res) => {
    try {
        const contents = await Content.find();
        return res.status(200).json(contents);
    } catch (error) {
        console.error("Error retrieving contents:", error);
        return res.status(500).json({ message: 'Error retrieving contents', error });
    }
};

const getContentByType = async (req, res) => {
    const { contentType } = req.params;

    try {
        const contents = await Content.find({ contentType });
        return res.status(200).json(contents);
    } catch (error) {
        console.error("Error retrieving contents by type:", error);
        return res.status(500).json({ message: 'Error retrieving contents by type', error });
    }
};

const updateContent = async (req, res) => {
    const { contentType } = req.params; // Get content type from URL parameters
    let updateFields = req.body;
console.log(contentType)
    try {
        // Find content by contentType
        const existingContent = await Content.findOne({ contentType });

        if (!existingContent) {
            return res.status(404).json({ message: 'Content not found for the given content type' });
        }

        // Update main content fields
        updateFields = {
            ...updateFields,
            photo: req.files['photo'] ? req.files['photo'].map(file => file.filename) : existingContent.photo,
            video: req.files['video'] ? req.files['video'][0].filename : existingContent.video,
            questions: updateFields.questions ? updateFields.questions.map(question => JSON.parse(question)) : existingContent.questions,
            status: updateFields.status !== undefined ? updateFields.status : existingContent.status,
            photoAlt: updateFields.photoAlt !== undefined ? updateFields.photoAlt : existingContent.photoAlt,
            videoAlt: updateFields.videoAlt !== undefined ? updateFields.videoAlt : existingContent.videoAlt
        };

        const updatedContent = await Content.findOneAndUpdate({ contentType }, updateFields, { new: true, runValidators: true });
        res.status(200).json(updatedContent);
    } catch (error) {
        console.error("Error updating content:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const addQuestions = async (req, res) => {
    const { id } = req.params; // Get content ID from URL parameters
    const { question, answer } = req.body;

    try {
        const existingContent = await Content.findById(id);

        if (!existingContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Add new question
        existingContent.questions.push({ question, answer });
        await existingContent.save();

        return res.status(201).json({ message: 'Question added successfully', content: existingContent });
    } catch (error) {
        console.error("Error adding question:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
const addSubsection = async (req, res) => {
    const { id } = req.params; // Get content ID from URL parameters

    try {
        // Extract subsection data from the JSON string
        const subsectionData = JSON.parse(req.body.data);
        const { title, description, photoAlt } = subsectionData; // Extract the fields

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        // Find existing content by ID
        const existingContent = await Content.findById(id);
        if (!existingContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Handle single photo upload
        let photo = null; // Initialize photo variable
        if (req.file) { // Check if a file has been uploaded
            photo = req.file.filename; // Get the filename of the uploaded photo
        } else {
            return res.status(400).json({ message: 'A photo is required.' });
        }

        // Add new subsection with the uploaded photo
        existingContent.subsections.push({ title, description, photo, photoAlt });
        await existingContent.save();

        return res.status(201).json({ message: 'Subsection added successfully', content: existingContent });
    } catch (error) {
        console.error("Error adding subsection:", error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};





const updateQuestions = async (req, res) => {
    const { id } = req.params; // Get content ID from URL parameters
    const { questions } = req.body;
  console.log(questions)
    try {
        const existingContent = await Content.findById(id);

        if (!existingContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        const parsedQuestions = questions ? questions.map(q => JSON.parse(q)) : [];
        
        existingContent.questions = parsedQuestions; // Update questions array
        await existingContent.save();

        return res.status(200).json({ message: 'Questions updated successfully', content: existingContent });
    } catch (error) {
        console.error("Error updating questions:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

const updateSubsections = async (req, res) => {
    const { id } = req.params; // Get content ID from URL parameters
    const { subsections } = req.body;

    try {
        const existingContent = await Content.findById(id);

        if (!existingContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        existingContent.subsections = subsections; // Update subsections array
        await existingContent.save();

        return res.status(200).json({ message: 'Subsections updated successfully', content: existingContent });
    } catch (error) {
        console.error("Error updating subsections:", error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    insertContent,
    getAllContent,
    getContentByType,
    updateContent,
    updateQuestions,
    updateSubsections,addQuestions,addSubsection
};
