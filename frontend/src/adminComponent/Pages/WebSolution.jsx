import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "react-toastify/dist/ReactToastify.css";

const modules = {
    toolbar: [
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
};

const EditWebSolutionDetails = () => {
    const { contentType } = useParams();
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState(""); 
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoAlt, setPhotoAlt] = useState(""); 
    const [video, setVideo] = useState("");
    const [videoAlt, setVideoAlt] = useState("");
    const [status, setStatus] = useState(true);
    const [contentId, setId] = useState("");
    const [questions, setQuestions] = useState([{ question: "", answer: "" }]); 
    const [subsections, setSubsections] = useState([{ title: "", description: "", photo: null, photoAlt: "" }]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3006/api/content/type/${contentType}`, { withCredentials: true });
                const serviceDetails = response.data[0]; 

                setHeading(serviceDetails.heading);
                setSubheading(serviceDetails.subheading || ""); 
                setDescription(serviceDetails.description);
                setPhoto(serviceDetails.photo[0] || null);
                setPhotoAlt(serviceDetails.photoAlt || ""); 
                setVideo(serviceDetails.video || "");
                setVideoAlt(serviceDetails.altVideo || "");
                setStatus(serviceDetails.status);
                setQuestions(serviceDetails.questions || [{ question: "", answer: "" }]);
                setSubsections(serviceDetails.subsections || [{ title: "", description: "", photo: null, photoAlt: "" }]);
                setId(serviceDetails._id);

                console.log("Fetched Service Details: ", serviceDetails);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServiceDetails();
    }, [contentType]);

    const handleMainFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('heading', heading);
            formData.append('subheading', subheading); 
            formData.append('description', description);
            formData.append('status', status);
            formData.append('altVideo', videoAlt);

            if (photo) {
                formData.append('photo', photo);
                formData.append('photoAlt', photoAlt); 
            }

            if (video) {
                formData.append('video', video);
            }

            await axios.post(`http://localhost:3006/api/content/${contentType}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            console.log("Main form submitted successfully");
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuestionsSubmit = async (e) => {
        e.preventDefault();
        try {
            const newQuestions = questions.filter(q => q.question && q.answer);
            await Promise.all(
                newQuestions.map(async (q) => {
                    const questionData = { question: q.question, answer: q.answer };
                    await axios.post(`http://localhost:3006/api/content/update/questions/${contentId}`, questionData, { withCredentials: true });
                })
            );

            console.log("Questions submitted successfully");
        } catch (error) {
            console.error("Error submitting questions:", error);
        }
    };

    const handleSubsectionsSubmit = async (e) => {
      e.preventDefault();
      console.log("Submitting subsections..."); // Add this line to check
      try {
          const validSubsections = subsections.filter(sub => sub.title && sub.description);
          await Promise.all(
              validSubsections.map(async (sub) => {
                  const allFormData = new FormData();
                  const subsectionData = {
                      title: sub.title,
                      description: sub.description,
                      photoAlt: sub.photoAlt || '',
                  };
  
                  allFormData.append('data', JSON.stringify(subsectionData));
  
                  if (sub.photo) {
                      allFormData.append('photo', sub.photo);
                  }
  
                  console.log('Submitting Subsection:', subsectionData);
  
                  await axios.post(`http://localhost:3006/api/content/add/subsections/${contentId}`, allFormData, {
                      headers: {
                          'Content-Type': 'multipart/form-data'
                      },
                      withCredentials: true
                  });
              })
          );
  
          console.log("All subsections submitted successfully");
      } catch (error) {
          console.error("Error submitting subsections:", error);
      }
  };
  

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setPhoto(selectedPhoto);
    };

    const handleVideoChange = (e) => {
        const selectedVideo = e.target.files[0];
        setVideo(selectedVideo);
        setVideoAlt("");
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
        };
        setQuestions(updatedQuestions);
    };

    const handleSubsectionChange = (index, field, value) => {
        const updatedSubsections = [...subsections];
        updatedSubsections[index] = {
            ...updatedSubsections[index],
            [field]: value,
        };
        setSubsections(updatedSubsections);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", answer: "" }]);
    };

    const handleAddSubsection = () => {
        setSubsections([...subsections, { title: "", description: "", photo: null, photoAlt: "" }]);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Service Details</h1>

            <form onSubmit={handleMainFormSubmit} className="mb-8">
                <div className="mb-4">
                    <label htmlFor="heading" className="block font-semibold mb-2">Heading</label>
                    <ReactQuill
                        value={heading}
                        onChange={setHeading}
                        className="quill"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="subheading" className="block font-semibold mb-2">Subheading</label>
                    <ReactQuill
                        value={subheading}
                        onChange={setSubheading}
                        className="quill"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        className="quill"
                    />
                </div>

                <div className="mt-12">
                    <label htmlFor="photo" className="block font-semibold mb-2">New Photo</label>
                    <input
                        type="file"
                        id="photo"
                        onChange={handlePhotoChange}
                        className="border rounded focus:outline-none"
                        accept="image/*"
                    />
                    {photo && (
                        <div className="mt-2">
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

                <div className="mt-4">
                    <label htmlFor="video" className="block font-semibold mb-2">New Video</label>
                    <input
                        type="file"
                        id="video"
                        onChange={handleVideoChange}
                        className="border rounded focus:outline-none"
                        accept="video/*"
                    />
                    {video && (
                        <div className="mt-2">
                            <label className="block mt-2">
                                Video Alternative Text:
                                <input
                                    type="text"
                                    value={videoAlt}
                                    onChange={(e) => setVideoAlt(e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none"
                                    placeholder="Enter video alternative text"
                                />
                            </label>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 mt-4 rounded-lg font-semibold hover:bg-blue-600"
                >
                    Update Main Content
                </button>
            </form>

            <form onSubmit={handleQuestionsSubmit} className="mb-8">
                <h2 className="text-lg font-bold mb-4">Manage Questions</h2>
                {questions.map((q, index) => (
                    <div key={index} className="mb-4">
                        <label className="block mb-1">Question</label>
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Enter question"
                            required
                        />
                        <label className="block mb-1 mt-2">Answer</label>
                        <ReactQuill
                            value={q.answer}
                            onChange={(value) => handleQuestionChange(index, 'answer', value)}
                            modules={modules}
                            className="quill"
                        />
                    </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="bg-gray-500 text-white p-2 mt-4 rounded-lg font-semibold hover:bg-gray-600"
                    >
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 mt-4 rounded-lg font-semibold hover:bg-green-600"
                    >
                        Update Questions
                    </button>
                </div>
            </form>

            <form onSubmit={handleSubsectionsSubmit} className="mb-8">
                <h2 className="text-lg font-bold mb-4">Manage Subsections</h2>
                {subsections.map((subsection, index) => (
                    <div key={index} className="mb-4">
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            value={subsection.title}
                            onChange={(e) => handleSubsectionChange(index, 'title', e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Enter subsection title"
                            required
                        />
                        <label className="block mb-1 mt-2">Description</label>
                        <ReactQuill
                            value={subsection.description}
                            onChange={(value) => handleSubsectionChange(index, 'description', value)}
                            modules={modules}
                            className="quill"
                        />
                        <label htmlFor="subsectionPhoto" className="block mt-4 font-semibold">Photo</label>
                        <input
                            type="file"
                            onChange={(e) => {
                                const selectedPhoto = e.target.files[0];
                                handleSubsectionChange(index, 'photo', selectedPhoto);
                            }}
                            className="border rounded focus:outline-none"
                            accept="image/*"
                        />
                        {subsection.photo && (
                            <div className="mt-2">
                                <label className="block mt-2">
                                    Alternative Text:
                                    <input
                                        type="text"
                                        value={subsection.photoAlt}
                                        onChange={(e) => handleSubsectionChange(index, 'photoAlt', e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-none"
                                        placeholder="Enter alternative text"
                                        required
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleAddSubsection}
                        className="bg-gray-500 text-white p-2 mt-4 rounded-lg font-semibold hover:bg-gray-600"
                    >
                        Add Subsection
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 mt-4 rounded-lg font-semibold hover:bg-green-600"
                    >
                        Update Subsections
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditWebSolutionDetails;
