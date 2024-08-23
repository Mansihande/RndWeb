// CategorySelection.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategorySelection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/services/getall", { withCredentials: true });
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleEditCategory = (categoryId) => {
    navigate(`/services/edit-service/${categoryId}`);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-4">Select Service Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="mb-2 flex justify-between items-center">
            <span>{category.category}</span>
            <button
              onClick={() => handleEditCategory(category._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelection;
