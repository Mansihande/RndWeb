const mongoose = require('mongoose');

// Define the HeroSection schema
const heroSectionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  subheading: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Reference to ServiceCategory
    ref: 'ServiceCategory',
    required: true,
    unique: true, // Ensures that each category is unique in the HeroSection
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the HeroSection model
const HeroSection = mongoose.model('HeroSection', heroSectionSchema);

module.exports = HeroSection;
