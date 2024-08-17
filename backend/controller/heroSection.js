const HeroSection = require('../model/heroSection'); // Adjust the path as necessary
const ServiceCategory = require('../model/serviceCategory'); // Import the ServiceCategory model

// Get HeroSection by category ID
const getHeroSectionByCategory = async (req, res) => {
  const { categoryId } = req.params; // Get categoryId from request parameters

  try {
    const heroSection = await HeroSection.findOne({ category: categoryId }).populate('category');
    if (heroSection) {
      return res.status(200).json({
        heading: heroSection.heading,
        subheading: heroSection.subheading,
        category: heroSection.category,
      });
    } else {
      return res.status(404).json({ message: 'Hero section not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving hero section' });
  }
};

const getHeroSectionBySlug = async (req, res) => {
  const { slug } = req.params; // Get slug from request parameters
 console.log(slug)
  try {
    // Find the HeroSection directly by the slug
    const heroSection = await HeroSection.findOne({slug: slug });

    if (heroSection) {
      return res.status(200).json({
        heading: heroSection.heading,
        subheading: heroSection.subheading,
      });
    } else {
      return res.status(404).json({ message: 'Hero section not found' });
    }
  } catch (err) {
    console.error("Error retrieving hero section:", err);
    res.status(500).json({ message: 'Error retrieving hero section' });
  }
};


// Insert or update HeroSection by category ID
const upsertHeroSection = async (req, res) => {
  const { categoryId } = req.params; // Get categoryId from request parameters
  const { heading, subheading } = req.body;

  try {
    // Find the category in the ServiceCategory schema using the categoryId
    const category = await ServiceCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Extract the slug from the category
    const slug = category.slug;

    // Find the HeroSection associated with the category
    let heroSection = await HeroSection.findOne({ category: categoryId });

    if (!heroSection) {
      // Create a new HeroSection if it doesn't exist
      heroSection = new HeroSection({
        heading: heading || 'Default Heading',
        subheading: subheading || 'Default Subheading',
        category: categoryId,
        slug: slug, // Store the slug from the category
      });
      await heroSection.save();
      return res.status(201).json({
        message: `Hero section created for category ${categoryId}`,
        heading: heroSection.heading,
        subheading: heroSection.subheading,
        slug: heroSection.slug,
      });
    }

    // Update existing HeroSection
    if (heading) heroSection.heading = heading;
    if (subheading) heroSection.subheading = subheading;
    heroSection.slug = slug; // Update the slug from the category

    await heroSection.save();
    res.status(200).json({
      heading: heroSection.heading,
      subheading: heroSection.subheading,
      slug: heroSection.slug,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating hero section' });
  }
};


module.exports = { getHeroSectionByCategory, upsertHeroSection ,getHeroSectionBySlug};
