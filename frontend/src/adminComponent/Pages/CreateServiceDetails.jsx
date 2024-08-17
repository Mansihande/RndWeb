import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewServiceForm = () => {
  const { categoryId } = useParams(); // Extract categoryId from URL
  const [heading, setHeading] = useState(""); // State for heading
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [video, setVideo] = useState(null);
  const [altVideo, setVideoAlt] = useState("");
  const [status, setStatus] = useState(true);
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 5) {
      toast.error("You can only upload up to 5 photos");
      return;
    }
    setPhotos([...photos, ...files]);
    const newPhotoAlts = Array.from({ length: files.length }, () => "");
    setPhotoAlts([...photoAlts, ...newPhotoAlts]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleDeleteImage = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setPhotoAlts((prevPhotoAlts) => prevPhotoAlts.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('heading', heading); // Use heading as the name field
      formData.append('description', description);
      formData.append('status', status);
      formData.append('altVideo', altVideo);
      formData.append('categoryId', categoryId); // Send categoryId from URL

      photos.forEach((photo, index) => {
        formData.append('photo', photo);
        formData.append('alt', photoAlts[index]);
      });

      if (video) {
        formData.append('video', video);
      }

      questions.forEach((qa) => {
        formData.append('questions', JSON.stringify(qa));
      });

      await axios.post('http://localhost:3006/api/serviceDetails/insertServiceDetail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      // Reset form fields
      setDescription("");
      setHeading(""); // Reset heading
      setPhotos([]);
      setVideo(null);
      setVideoAlt("");
      setStatus(true);
      setPhotoAlts([]);
      setQuestions([{ question: "", answer: "" }]);
      navigate('/services');
    } catch (error) {
      console.error(error);
      toast.error("Failed to create service.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <ToastContainer />
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Service</h1>
  
      {/* Heading Field */}
      <div className="mb-4">
        <label htmlFor="heading" className="block font-semibold mb-2">Heading</label>
        <input
          type="text"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      
      {/* Description Field */}
      <div className="mb-8">
        <label htmlFor="description" className="block font-semibold mb-2">Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          className="quill"
        />
      </div>
      
      {/* Photo Upload Field */}
      <div className="mt-12">
        <label htmlFor="photo" className="block font-semibold mb-2">Photos</label>
        <input
          type="file"
          name="photo"
          id="photo"
          multiple
          onChange={handlePhotoChange}
          className="border rounded focus:outline-none"
          accept="image/*"
        />
        {photos.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group flex flex-col items-center w-56">
                <div className="relative w-56">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Service ${index + 1}`}
                    className="w-56 h-32 object-cover"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                  >
                    X
                  </button>
                </div>
                <label className="block mt-2">
                  Alternative Text:
                  <input
                    type="text"
                    value={photoAlts[index]}
                    onChange={(e) => {
                      const newPhotoAlts = [...photoAlts];
                      newPhotoAlts[index] = e.target.value;
                      setPhotoAlts(newPhotoAlts);
                    }}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Video Upload Field */}
      <div className="mt-4">
        <label htmlFor="video" className="block font-semibold mb-2">Video</label>
        <input
          type="file"
          id="video"
          onChange={handleVideoChange}
          className="border rounded focus:outline-none"
          accept="video/*"
        />
        {video && (
          <div className="mt-4">
            <label htmlFor="videoAlt" className="block font-semibold mb-2">Video Alt Text</label>
            <input
              type="text"
              id="videoAlt"
              value={altVideo}
              onChange={(e) => setVideoAlt(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none"
              required
            />
          </div>
        )}
      </div>
      
      {/* Status Radio Buttons */}
      <div className="mt-4">
        <label className="block font-semibold mb-2">Status</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value={true}
              checked={status === true}
              onChange={() => setStatus(true)}
              className="mr-2"
            />
            Active
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value={false}
              checked={status === false}
              onChange={() => setStatus(false)}
              className="mr-2"
            />
            Inactive
          </label>
        </div>
      </div>

      {/* Questions and Answers Section */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Questions and Answers</h2>
        {questions.map((qa, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <label className="block mb-2">Question:</label>
            <input
              type="text"
              name="question"
              value={qa.question}
              onChange={(event) => handleQuestionChange(index, event)}
              className="w-full p-2 border rounded focus:outline-none"
            />
            <label className="block mb-2 mt-2">Answer:</label>
            <input
              type="text"
              name="answer"
              value={qa.answer}
              onChange={(event) => handleQuestionChange(index, event)}
              className="w-full p-2 border rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="mt-2 text-red-500 hover:underline"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
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

export default NewServiceForm;
