import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DesignProcessForm = () => {
  const { categoryId } = useParams(); // Extract categoryId from URL

  const [title, setTitle] = useState(""); // State for title
  const [subheading, setSubheading] = useState(""); // State for subheading
  const [description, setDescription] = useState(""); // State for description
  const [image, setImage] = useState(null); // State for image
  const [hours, setHours] = useState(""); // State for hours in "X-Y hours" or "X-Y days" format
  const [priority, setPriority] = useState(0); // State for priority
  const [photoAlt, setPhotoAlt] = useState(""); // State for alternative text for the image
  const [status, setStatus] = useState("active"); // State for status (active or inactive)
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title); // Add title
      formData.append('subheading', subheading); // Add subheading
      formData.append('description', description); // Add description

      if (image) {
        formData.append('images', image); // Add image
        formData.append('alt', photoAlt); // Add alt text for the image
      }

      formData.append('hours', hours); // Add hours
      formData.append('priority', priority); // Add priority
      formData.append('categoryId', categoryId); // Send categoryId with the request
      formData.append('status', status); // Add status (active or inactive)

      await axios.post('http://localhost:3006/api/designProcess/insertDesignProcess', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      // Reset form fields
      setTitle("");
      setSubheading("");
      setDescription("");
      setImage(null);
      setHours("");
      setPhotoAlt("");
      setPriority(0);
      setStatus("active"); // Reset status to default
      navigate('/services'); // Navigate to the desired route
      toast.success("Design process created successfully!"); // Show success notification
    } catch (error) {
      console.error(error);
      toast.error("Failed to create design process.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Design Process</h1>

      {/* Title Field */}
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>

      {/* Subheading Field */}
      <div className="mb-4">
        <label htmlFor="subheading" className="block font-semibold mb-2">Subheading</label>
        <input
          type="text"
          id="subheading"
          value={subheading}
          onChange={(e) => setSubheading(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      
      {/* Description Field */}
      <div className="mb-8">
        <label htmlFor="description" className="block font-semibold mb-2">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          rows="4"
        />
      </div>

      {/* Image Upload Field */}
      <div className="mt-12">
        <label htmlFor="photo" className="block font-semibold mb-2">Photo</label>
        <input
          type="file"
          id="photo"
          onChange={handleImageChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />
        {image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-56 h-32 object-cover mt-2"
            />
            <label className="block mt-2">
              Alternative Text:
              <input
                type="text"
                value={photoAlt}
                onChange={(e) => setPhotoAlt(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
                placeholder="Enter alternative text"
                required
              />
            </label>
          </div>
        )}
      </div>

      {/* Hours Field */}
      <div className="mt-4">
        <label htmlFor="hours" className="block font-semibold mb-2">Hours</label>
        <input
          type="text"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
          placeholder="e.g., 1-2 hours or 1-2 days"
        />
      </div>

      {/* Priority Field */}
      <div className="mt-4">
        <label htmlFor="priority" className="block font-semibold mb-2">Priority</label>
        <input
          type="number"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
          min="0" // Assuming priority can't be negative
        />
      </div>

      {/* Status Field */}
      <div className="mt-4">
        <label htmlFor="status" className="block font-semibold mb-2">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-8 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default DesignProcessForm;