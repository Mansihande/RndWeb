import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "../servicecomponent/HeroSection";
import ServiceTable from "../servicecomponent/ServiceDetails";
import LatestProjects from "../servicecomponent/LatestProject";
import Companies from "../servicecomponent/Companies";
import Packages from "../servicecomponent/Packages";
import DesignProcess from "../servicecomponent/DesignProcess"
const ServiceForm = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [showHeroSection, setShowHeroSection] = useState(false);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3006/api/services/getall",
        { withCredentials: true }
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleParentCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setParentCategoryId(selectedCategoryId);
    setShowHeroSection(!!selectedCategoryId); // Show HeroSection if a category is selected
  };

  const renderCategoryOptions = (category) => (
    <option key={category._id} value={category._id}>
      {category.category}
    </option>
  );

  return (
    <form className="p-4">
      <ToastContainer />
      <div className="mb-4">
        <label htmlFor="parentCategory" className="block font-semibold mb-2">
          Select Service Category
        </label>
        <select
          id="parentCategory"
          value={parentCategoryId}
          onChange={handleParentCategoryChange}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          <option value="">Select Parent Category</option>
          {categories.map(renderCategoryOptions)}
        </select>
      </div>

      {showHeroSection && parentCategoryId && (
        <div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Hero Section</h2>
            <HeroSection categoryId={parentCategoryId} />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Details Section</h2>
            <ServiceTable categoryId={parentCategoryId} />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Latest Projects Section</h2>
            <LatestProjects categoryId={parentCategoryId} />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Companies Section</h2>
            <Companies categoryId={parentCategoryId} />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold"> Packages Section</h2>
            <Packages categoryId={parentCategoryId} />
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Design Process Section</h2>
            <DesignProcess categoryId={parentCategoryId} />
          </div>
        </div>
      )}
    </form>
  );
};

export default ServiceForm;
