const mongoose = require('mongoose');

// Define the Question schema
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
       
    },
    answer: {
        type: String,
        
    }
}, { _id: false }); // Disable automatic ID generation for subdocuments

// Define the Subsection schema
const subsectionSchema = new mongoose.Schema({
    photo: {
        type: String, // Assuming you store the image URL or path
  
    },
    photoAlt: { // New field for alternative text for the subsection photo
        type: String,
       
    },
    title: {
        type: String,
       
    },
    description: {
        type: String,
        
    }
}, { _id: false }); // Disable automatic ID generation for subdocuments

// Define the main model schema
const contentSchema = new mongoose.Schema({
    photo: { type: [String], required: false }, // Change to an array of strings
    video: { type: String, required: false },
    photoAlt: { // New field for alternative text for the main photo
        type: String,
        required: false, // Set to true if required
    },

    videoAlt: { // New field for alternative text for the video
        type: String,
        required: false, // Set to true if required
    },
    heading: {
        type: String,
        required: true,
    },
    subheading: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema], // Array of questions, optional
        default: [] // Default to an empty array if not provided
    },
    subsections: {
        type: [subsectionSchema], // Array of subsections, optional
        default: [] // Default to an empty array if not provided
    },
    status: { type: Boolean, default: false },

    // New field added for content type
    contentType: {
        type: String,
        enum: [
            'webSolution',
            'plans',
            'bookcall',
            'whyPartnerus',
            'globalsolution',
            'challengesface',
            'howecanhelp',
            'ourservices',
            'homeanimation',
            'premiumtemplates',
            'weareexpertsin',
            'everyplan'
        ],
        required: true // Ensure this field is required
    },
}, { timestamps: true }); // Include timestamps for createdAt and updatedAt

// Create the model
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
