import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditServiceDetails = () => {
  const { categoryId } = useParams();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]); // Renamed for consistency
  const [photoAlts, setPhotoAlts] = useState([]);
  const [video, setVideo] = useState(null); // Initialized to null
  const [videoAlt, setVideoAlt] = useState("");
  const [status, setStatus] = useState(true);
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [initialPhotoAlts, setInitialPhotoAlts] = useState([]);
  const [initialVideoAlt, setInitialVideoAlt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`/api/serviceDetails/getServiceDetailById?id=${categoryId}`, { withCredentials: true });
      const serviceDetails = response.data.data;

      setHeading(serviceDetails.heading);
      setDescription(serviceDetails.description);
      setPhotos(serviceDetails.photo || []);
      setInitialPhotos(serviceDetails.photo || []); // Store initial photos
      setInitialPhotoAlts(serviceDetails.alt || []); // Store initial alt texts
      setVideo(serviceDetails.video);
      setVideoAlt(serviceDetails.altVideo);
      setInitialVideoAlt(serviceDetails.altVideo);
      setStatus(serviceDetails.status);
      setQuestions(serviceDetails.questions || [{ question: "", answer: "" }]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('heading', heading);
      formData.append('description', description);
      formData.append('status', status);

      if (video) {
        formData.append('video', video);
        formData.append('altVideo', videoAlt);
      }
      const combinedAlts = [...initialPhotoAlts, ...photoAlts];


      photos.forEach((p) => {
        formData.append('photo', p);
      });

      combinedAlts.forEach((a) => {
        formData.append('alt', a);
      });
      questions.forEach((q) => {
        formData.append('questions', JSON.stringify(q));
      });

      await axios.put(`/api/serviceDetails/updateServiceDetail?id=${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      navigate(`/services/edit-service/${categoryId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos([...photos, ...newPhotos]);
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
    setVideoAlt(""); // Reset alt text when new video is uploaded
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleInitialAltTextChange = (e, index) => {
    const newPhotoAlts = [...initialPhotoAlts];
    newPhotoAlts[index] = e.target.value;
    setInitialPhotoAlts(newPhotoAlts);
  };

  const handleNewAltTextChange = (e, index) => {
    const newPhotoAlts = [...photoAlts];
    newPhotoAlts[index] = e.target.value;
    setPhotoAlts(newPhotoAlts);
  };

  const handleDeleteInitialPhoto = async (e, photoFilename, index) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/serviceDetails/${categoryId}/image/${photoFilename}/${index}`, { withCredentials: true });
      const updatedPhotos = initialPhotos.filter((_, i) => i !== index);
      setInitialPhotos(updatedPhotos);
      const updatedPhotoAlts = initialPhotoAlts.filter((_, i) => i !== index);
      setInitialPhotoAlts(updatedPhotoAlts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNewPhoto = (e, index) => {
    e.preventDefault();
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    const updatedPhotoAlts = photoAlts.filter((_, i) => i !== index);
    setPhotoAlts(updatedPhotoAlts);
  };

  const handleDeleteVideo = async (e) => {
    e.preventDefault();
    try {
      if (video) {
        await axios.delete(`/api/serviceDetails/serviceDetail/${categoryId}/video/${video}`, { withCredentials: true });
        setVideo(null);
        setVideoAlt(""); // Optionally reset alt text
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };
  
  const handleDeleteQuestion = async (e, questionId, index) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/serviceDetails/${categoryId}/questions/${questionId}`, { withCredentials: true });
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Service Details</h1>

      <div className="mb-4">
        <label htmlFor="heading" className="block font-semibold mb-2">Heading</label>
       <div className="mb-4">     
           <ReactQuill
          value={heading}
          onChange={setHeading}
          className="quill"
          required
        />
      </div>

      <div className="mb-8">
        <label htmlFor="description" className="block font-semibold mb-2">Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="quill"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Current Photos</label>
        <div className="flex flex-wrap gap-4">
          {initialPhotos.map((photo, index) => (
            <div key={index} className="relative w-56">
              <img
                src={`/api/image/download/${photo}`}
                alt={`Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              />
              <label htmlFor={`alt-${index}`} className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id={`alt-${index}`}
                  value={initialPhotoAlts[index] || ""}
                  onChange={(e) => handleInitialAltTextChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteInitialPhoto(e, photo, index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Add New Photos</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="p-2 border rounded"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {photos.map((file, index) => (
            <div key={index} className="relative w-56">
              {/* <img
                src={URL.createObjectURL(file)}
                alt={`New Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              /> */}
              <label htmlFor={`alt-new-${index}`} className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id={`alt-new-${index}`}
                  value={photoAlts[index] || ""}
                  onChange={(e) => handleNewAltTextChange(e, index)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteNewPhoto(e, index)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          ))}
        </div>
      </div>


        <label className="block font-semibold mb-2">Video</label>
        {video && (
          <div className="relative mb-2">
            <video
          src={`/api/video/download/${video}`} // Update this to match your API endpoint for video
          controls
          className="w-56 h-32 object-cover"
        />
            <label htmlFor="videoAlt" className="block mt-2">
              Alternative Text:
              <input
                type="text"
                id="videoAlt"
                value={videoAlt || initialVideoAlt}
                onChange={(e) => setVideoAlt(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
              />
            </label>
            <button
              onClick={handleDeleteVideo}
              className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 flex justify-center items-center"
            >
              <span className="text-xs">X</span>
            </button>
          </div>
        )}
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value === "true")}
          className="p-2 border rounded focus:outline-none"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Questions & Answers</label>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              className="w-full p-2 mb-2 border rounded focus:outline-none"
            />
            <ReactQuill
              value={question.answer}
              onChange={(value) => handleQuestionChange(index, "answer", value)}
              className="quill"
            />
            <button
              type="button"
              onClick={(e) => handleDeleteQuestion(e, question._id, index)}
              className="mt-2 bg-red-500 text-white rounded-md p-2 flex justify-center items-center"
            >
              <span className="text-xs">Remove</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="mt-4 bg-green-500 text-white rounded-md p-2"
        >
          Add Question
        </button>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 flex justify-center items-center"
        >
          <span className="text-xs">Update Service Details</span>
        </button>
      </div>
    </form>
  );
};

export default EditServiceDetails;
