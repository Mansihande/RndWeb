import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditExtraPage = () => {
  const { contentType } = useParams();
  const [photo, setPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [video, setVideo] = useState("");
  const [videoAlt, setVideoAlt] = useState("");
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [subsections, setSubsections] = useState([
    { photo: "", photoAlt: "", title: "", description: "" },
  ]);
  const [status, setStatus] = useState(false);

  const [contentId, setContentId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchContentDetails();
  }, []);

  const fetchContentDetails = async () => {
    try {
      const response = await axios.get(`/api/content/type/${contentType}`, {
        withCredentials: true,
      });
      const content = response.data[0];

      setPhotos(content.photo || []);
      setPhotoAlts(content.photoAlt || []);
      setVideo(content.video || "");
      setVideoAlt(content.videoAlt || "");
      setHeading(content.heading || "");
      setSubheading(content.subheading || "");
      setDescription(content.description || "");
      setQuestions(
        content.questions.length > 0
          ? content.questions
          : [{ question: "", answer: "" }]
      );
      setSubsections(
        content.subsections.length > 0
          ? content.subsections
          : [{ photo: "", photoAlt: "", title: "", description: "" }]
      );
      setStatus(content.status || false);
      setContentId(content._id || "");
    } catch (error) {
      console.error(error);
    }
  };

  // Update Main Content
  const handleMainContentSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("subheading", subheading);
      formData.append("description", description);
      formData.append("status", status);

      formData.append("contentType", contentType);
      formData.append("video", video);
      formData.append("videoAlt", videoAlt);

      photo.forEach((photo) => formData.append("photo", photo));
      photoAlts.forEach((alt) => formData.append("photoAlt", alt));

      await axios.put(`/api/content/${contentType}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      navigate(`/extrapages/${contentType}`);
    } catch (error) {
      console.error("Error updating main content:", error);
    }
  };

  // Function to handle adding a new question
  const handleAddQuestion = () => {
    const newQuestion = { question: "", answer: "" };
    setQuestions([...questions, newQuestion]);
  };

  // Function to handle changes in question/answer
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = async (index) => {
    try {
      // Call the API to delete the question
      await axios.delete(`/api/content/${contentId}/question/${index}`, {
        withCredentials: true,
      });

      // Update the local state after successful deletion
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions); // Assuming `questions` is a state variable
    } catch (error) {
      console.error("Error deleting question:", error);
      // Optionally, show an error message to the user
    }
  };

  // Update Questions
  const handleQuestionsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/content/update/questions/${contentId}`,
        { questions },
        { withCredentials: true }
      );
      console.log("Questions updated successfully");
    } catch (error) {
      console.error("Error updating questions:", error);
    }
  };

  // Function to add a new subsection
  const handleAddSubsection = () => {
    setSubsections([...subsections, { photo: "", title: "", description: "" }]);
  };

  // Function to handle changes in subsection fields
  const handleSubsectionChange = (index, field, value) => {
    const updatedSubsections = [...subsections];
    updatedSubsections[index][field] = value;
    setSubsections(updatedSubsections);
  };

  // Function to handle deletion of a subsection
  const handleDeleteSubsection = async (index) => {
      try {
          await axios.delete(`/api/content/subsections/${contentId}/${index}`, { withCredentials: true });
          console.log("Subsection deleted successfully");
          
          // Remove the deleted subsection from the state
          const updatedSubsections = subsections.filter((_, i) => i !== index);
          setSubsections(updatedSubsections);
      } catch (error) {
          console.error("Error deleting subsection:", error);
      }
  };
  
  // Function to handle photo upload
  const handlePhotoUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSubsections = [...subsections];
        updatedSubsections[index].photo = reader.result; // Store the image as a base64 string
        setSubsections(updatedSubsections);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubsectionsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/content/subsections/${contentId}`,
        { subsections },
        { withCredentials: true }
      );
      console.log("Subsections updated successfully");
    } catch (error) {
      console.error("Error updating subsections:", error);
    }
  };
  // Handlers for file and input changes
  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos([...photo, ...newPhotos]);
  };

  const handleAltTextChange = (e, index) => {
    const newPhotoAlts = [...photoAlts];
    newPhotoAlts[index] = e.target.value;
    setPhotoAlts(newPhotoAlts);
  };

  const handleDeletePhoto = async (e, index) => {
    e.preventDefault();

    // Get the filename and alt text associated with the photo to be deleted
    const imageFilename = photo[index];

    try {
      // Make API call to delete the photo
      await axios.delete(
        `/api/content/deletePhotoAndAltText/${contentId}/${imageFilename}/${index}`,
        { withCredentials: true }
      );

      // Update local state only if the API call is successful
      const updatedPhotos = photo.filter((_, i) => i !== index);
      setPhotos(updatedPhotos);

      const updatedPhotoAlts = photoAlts.filter((_, i) => i !== index);
      setPhotoAlts(updatedPhotoAlts);
    } catch (error) {
      console.error("Error deleting photo:", error);
      // Optionally, you can show an error message to the user here
    }
  };
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleDeleteVideo = async (e, videoFilename) => {
    e.preventDefault();

    try {
      // Call the API to delete the video
      await axios.delete(`/api/content/${contentId}/video/${videoFilename}`, {
        withCredentials: true,
      });

      // Update the local state after successful deletion
      setVideo(""); // Assuming `video` is a state variable holding the video filename
      setVideoAlt(""); // Assuming `videoAlt` is a state variable holding the video alt text
    } catch (error) {
      console.error("Error deleting video:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">
        Edit Content
      </h1>

      {/* Main Content Form */}
      <form onSubmit={handleMainContentSubmit} className="mb-8">
        {/* Heading */}
        <div className="mb-4">
          <label htmlFor="heading" className="block font-semibold mb-2">
            Heading
          </label>

          <ReactQuill
            value={heading}
            onChange={setHeading}
            className="bg-white"
          />
        </div>

        {/* Subheading */}
        <div className="mb-4">
          <label htmlFor="subheading" className="block font-semibold mb-2">
            Subheading
          </label>

          <ReactQuill
            value={subheading}
            onChange={setSubheading}
            className="bg-white"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="bg-white"
          />
        </div>

        {/* Photos */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Current Photos</label>
          <div className="flex flex-wrap gap-4">
            {photo.map((photo, index) => (
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
                    value={photoAlts[index] || ""}
                    onChange={(e) => handleAltTextChange(e, index)}
                    className="w-full p-2 border rounded focus:outline-none"
                  />
                </label>
                <button
                  onClick={(e) => handleDeletePhoto(e, index)}
                  className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 flex justify-center items-center"
                >
                  <span className="text-xs">X</span>
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="p-2 border rounded mt-4"
          />
        </div>

        {/* Video */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Video</label>
          {video && (
            <div className="relative mb-2">
              <video
                src={`/api/video/download/${video}`}
                controls
                className="w-56 h-32 object-cover"
              />
              <label htmlFor="videoAlt" className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id="videoAlt"
                  value={videoAlt || ""}
                  onChange={(e) => setVideoAlt(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none"
                />
              </label>
              <button
                onClick={(e) => handleDeleteVideo(e, video)}
                className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 flex justify-center items-center"
              >
                <span className="text-xs">X</span>
              </button>
            </div>
          )}

          <input
            type="file"
            onChange={handleVideoChange}
            accept="video/*"
            className="p-2 border rounded"
          />
        </div>

        {/* Status */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="status"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="status" className="font-semibold">
            Active
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Content
        </button>
      </form>

      {/* Questions Form */}
      <form onSubmit={handleQuestionsSubmit} className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label
                htmlFor={`question-${index}`}
                className="block font-semibold"
              >
                Question
              </label>
              <input
                type="text"
                id={`question-${index}`}
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor={`answer-${index}`}
                className="block font-semibold"
              >
                Answer
              </label>
              <ReactQuill
                value={question.answer}
                onChange={(value) =>
                  handleQuestionChange(index, "answer", value)
                }
                className="bg-white"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteQuestion(index)}
              className="text-red-500 text-sm mt-2"
            >
              Delete Question
            </button>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Questions
        </button>
      </form>

      <form onSubmit={handleSubsectionsSubmit} className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Subsections</h2>
        {subsections.map((subsection, index) => (
          <div key={index} className="mb-4">
            {/* Display Existing Photo */}
            {subsection.photo ? (
              <div className="mb-2">
                <label className="block font-semibold mb-2">
                  Current Photo
                </label>
                <div className="relative w-56 mb-4">
                  <img
                    src={
                      subsection.photo.startsWith("data:")
                        ? subsection.photo
                        : `/api/image/download/${subsection.photo}`
                    }
                    alt={`Photo ${index + 1}`}
                    className="w-56 h-32 object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-2">
                <label
                  htmlFor={`subsection-photo-upload-${index}`}
                  className="block font-semibold"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  id={`subsection-photo-upload-${index}`}
                  onChange={(e) => handlePhotoUpload(e, index)}
                  accept="image/*"
                  className="p-2 border rounded focus:outline-none"
                />
              </div>
            )}

            {/* Title */}
            <div className="mb-2">
              <label
                htmlFor={`subsection-title-${index}`}
                className="block font-semibold"
              >
                Title
              </label>
              <input
                type="text"
                id={`subsection-title-${index}`}
                value={subsection.title}
                onChange={(e) =>
                  handleSubsectionChange(index, "title", e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="mb-2">
              <label
                htmlFor={`subsection-description-${index}`}
                className="block font-semibold"
              >
                Description
              </label>
              <ReactQuill
                value={subsection.description}
                onChange={(value) =>
                  handleSubsectionChange(index, "description", value)
                }
                className="bg-white"
              />
            </div>

            {/* Delete Subsection Button */}
            <button
              type="button"
              onClick={() => handleDeleteSubsection(index)}
              className="text-red-500 text-sm mt-2"
            >
              Delete Subsection
            </button>
          </div>
        ))}

        {/* Add Subsection Button */}
        <button
          type="button"
          onClick={handleAddSubsection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Add Subsection
        </button>

        {/* Submit Form Button */}
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Update Subsections
        </button>
      </form>
    </div>
  );
};

export default EditExtraPage;
