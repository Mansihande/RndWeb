const express = require('express');
const {
  getHeroSectionByCategory,
  upsertHeroSection,
  getHeroSectionBySlug,
} = require('../controller/heroSection'); // Adjust the path as necessary

const router = express.Router();

// Route to get HeroSection by category ID
router.get('/:categoryId', getHeroSectionByCategory);
router.get('/front/:slug',getHeroSectionBySlug)
// Route to insert/update HeroSection by category ID
router.put('/:categoryId', upsertHeroSection);

module.exports = router;
