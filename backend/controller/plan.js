const Package = require("../model/packages"); // Change to Package model
const ServiceCategory = require("../model/serviceCategory"); // Adjust this if necessary
const fs = require('fs');
const path = require('path');

const insertPackage = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      popular, 
      price, 
      slots, 
      whatYouGet, 
      whatIsTheir, 
      whatIsNotTheir, 
      categories, 
      subcategories, 
      subSubcategories, 
      status 
    } = req.body;

    // Fetch the category and get the slug
    const category = await ServiceCategory.findById(categories);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Extract the slug from the category
    const slug = category.slug;

    // Create a new Package with the slug field
    const packageData = new Package({
      title,
      description,
      popular,
      price,
      slots,
      whatYouGet,
      whatIsTheir,
      whatIsNotTheir,
      categories,
      subcategories,
      subSubcategories,
      status,
      slug // Store the slug in the Package model
    });

    await packageData.save();
    res.status(201).json({ message: 'Package inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting package' });
  }
};


const updatePackage = async (req, res) => {
  const { id } = req.params; // Extract the id from req.params
  console.log(id); // Log the id for debugging purposes

  // Extract the update fields from the request body
  const updateFields = req.body;

  try {
    const existingPackage = await Package.findOne({ _id: id }); // Use an object with the _id field

    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Update the package with the new fields
    const updatedPackage = await Package.findOneAndUpdate(
      { _id: id }, // Query to find the package
      updateFields, // Fields to update
      { new: true, runValidators: true } // Options
    );

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message }); // Send the error message in the response
  }
};


const deletePackage = async (req, res) => {
  const { id } = req.query;
console.log(id)
  try {
    const deletedPackage = await Package.findOneAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllPackages = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;

    const count = await Package.countDocuments();

    const packages = await Package.find()
      .skip((page - 1) * limit)
      .limit(limit);

    // Map over each package to find and append the category name
    const packagesWithCategoryName = await Promise.all(packages.map(async (pkg) => {
      const category = await ServiceCategory.findOne({ '_id': pkg.categories });
      const categoryName = category ? category.category : 'Uncategorized';

      return {
        ...pkg.toJSON(),
        categoryName
      };
    }));

    res.status(200).json({
      data: packagesWithCategoryName,
      total: count,
      currentPage: page,
      hasNextPage: count > page * limit
    });
  } catch (error) {
    console.error("Error retrieving packages:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllPackagesSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the category based on the slug
    const category = await ServiceCategory.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: 'No category found for the given slug' });
    }
  
    // Initialize an object to hold subcategory arrays
    const subcategories = {};
    const categoryId = category._id;

    // Initialize subcategory arrays
    category.subCategories.forEach(subcategory => {
      if (subcategory && subcategory.category) {
        subcategories[subcategory.category] = [];
      }
    });

    // Find packages for the given category ID
    const packages = await Package.find({ categories: categoryId });

    // Sort packages into subcategories
    packages.forEach(pkg => {
      if (pkg && pkg.subcategories && pkg.subcategories.length > 0) {
        pkg.subcategories.forEach(subcatId => {
          const subcategory = category.subCategories.find(sc => sc._id.toString() === subcatId.toString());
          const subcategoryName = subcategory ? subcategory.category : 'Uncategorized';

          if (!subcategories[subcategoryName]) {
            subcategories[subcategoryName] = [];
          }
          
          subcategories[subcategoryName].push({
            ...pkg.toJSON(),
            subcategoryName,
            categoryId
          });
        });
      } 
    });

    res.status(200).json({
      data: {
        category: category.category,
        subcategories
      },
      total: packages.length
    });
  } catch (error) {
    console.error("Error retrieving packages:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};



const getSinglePackage = async (req, res) => {
  const { id } = req.params; // Correctly extract the id from req.params
  console.log(id); // Log the id for debugging purposes
  try {
    const pkg = await Package.findOne({ _id: id }); // Use an object with the _id field

    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(pkg);
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ message: 'Server error', error: error.message }); // Send the error message in the response
  }
};




const getCategoryPackages = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const packages = await Package.find({ categories: categoryId });

    if (packages.length === 0) {
      return res.status(404).json({ message: 'No packages found for this category' });
    }

    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getSubcategoryPackages = async (req, res) => {
  const { subcategoryId } = req.query;

  try {
    const packages = await Package.find({ subcategories: subcategoryId });

    if (packages.length === 0) {
      return res.status(404).json({ message: 'No packages found for this subcategory' });
    }

    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  insertPackage,
  updatePackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
  getCategoryPackages,
  getSubcategoryPackages,getAllPackagesSlug
};
