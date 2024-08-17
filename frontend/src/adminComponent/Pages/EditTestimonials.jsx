import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditTestimonial = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [testimony, setTestimony] = useState("");
  const [photo, setPhoto] = useState([]);
  const [status, setStatus] = useState("active");
  const [priority, setPriority] = useState("medium");
  const [video, setVideo] = useState(null);
  const [videoAlt, setVideoAlt] = useState("");
  const { id } = useParams();
  const [initialPhotos, setInitialPhotos] = useState([]);
  const [photoAlts, setPhotoAlts] = useState([]);
  const [initialphotoAlts, setInitialPhotoAlts] = useState([]);
  const [initialVideoAlt, setInitialVideoAlt] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const fetchTestimonial = async () => {
    try {
      const response = await axios.get(`http://localhost:3006/api/testimonial/getTestimonialById?id=${id}`, { withCredentials: true });
      const testimonial = response.data.data;

      setName(testimonial.name);
      setDesignation(testimonial.designation);
      setTestimony(testimonial.testimony);
      setInitialPhotos(testimonial.photo);
      setStatus(testimonial.status);
      setPriority(testimonial.priority);
      setInitialPhotoAlts(testimonial.alt);
      setVideo(testimonial.video);
      setInitialVideoAlt(testimonial.altVideo);

    } catch (error) {
      console.error(error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('designation', designation);
      formData.append('testimony', testimony);
      formData.append('status', status);
      formData.append('priority', priority);
      
      if (video) {
        formData.append('video', video);
        formData.append('altVideo', videoAlt || initialVideoAlt);
      }

      const combinedAlts = [...initialphotoAlts, ...photoAlts];
      
      photo.forEach((p) => {
        formData.append('photo', p);
      });

      combinedAlts.forEach((a) => {
        formData.append('alt', a);
      });

      const response = await axios.put(`http://localhost:3006/api/testimonial/updateTestimonial?id=${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      navigate('/testimonials');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhoto([...photo, ...newPhotos]);
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  const handleInitialAltTextChange = (e, index) => {
    const newPhotoAlts = [...initialphotoAlts];
    newPhotoAlts[index] = e.target.value;
    setInitialPhotoAlts(newPhotoAlts);
  };

  const handleNewAltTextChange = (e, index) => {
    const newPhotoAlts = [...photoAlts];
    newPhotoAlts[index] = e.target.value;
    setPhotoAlts(newPhotoAlts);
  };

  const handleDeleteInitialPhoto = (e, photoFilename, index) => {
    e.preventDefault();
    axios.delete(`http://localhost:3006/api/testimonial/${id}/image/${photoFilename}/${index}`, { withCredentials: true })
      .then(response => {
        const updatedPhotos = initialPhotos.filter(photo => photo !== photoFilename);
        setInitialPhotos(updatedPhotos);
        const updatedPhotoAlts = [...initialphotoAlts];
        updatedPhotoAlts.splice(index, 1);
        setInitialPhotoAlts(updatedPhotoAlts);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteNewPhoto = (e, index) => {
    e.preventDefault();
    const updatedPhotos = [...photo];
    updatedPhotos.splice(index, 1);
    setPhoto(updatedPhotos);
    const updatedPhotoAlts = [...photoAlts];
    updatedPhotoAlts.splice(index, 1);
    setPhotoAlts(updatedPhotoAlts);
  };

  const handleDeleteVideo = async (e) => {
    e.preventDefault();
    try {
      const videoFilename = video.name; // Get the current video filename
      await axios.delete(`http://localhost:3006/api/testimonial/${id}/video/${videoFilename}`, { withCredentials: true });
      
      // Reset video state
      setVideo(null);
      setVideoAlt(""); // Optionally reset alt text
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Testimonial</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="designation" className="block font-semibold mb-2">
          Designation
        </label>
        <input
          type="text"
          id="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="testimony" className="block font-semibold mb-2">
          Testimony
        </label>
        <ReactQuill
          value={testimony}
          onChange={setTestimony}
          modules={modules}
          className="quill"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Current Photos</label>
        <div className="flex flex-wrap gap-4">
          {initialPhotos.map((photo, index) => (
            <div key={index} className="relative w-56">
              <img
                src={`http://localhost:3006/api/image/download/${photo}`}
                alt={`Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              />
              <label htmlFor={`alt-${index}`} className="block mt-2">
                Alternative Text:
                <input
                  type="text"
                  id={`alt-${index}`}
                  value={initialphotoAlts[index]}
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
          {photo.map((file, index) => (
            <div key={index} className="relative w-56">
              <img
                src={URL.createObjectURL(file)}
                alt={`New Photo ${index + 1}`}
                className="w-56 h-32 object-cover"
              />
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
      <div className="mb-4">
  <label htmlFor="video" className="block font-semibold mb-2">
    Upload Video
  </label>
  <input
    type="file"
    id="video"
    onChange={handleVideoChange}
    accept="video/*"
    className="p-2 border rounded"
  />
  {video && (
    <div className="mt-4">
      <label className="block font-semibold mb-2">Current Video</label>
      <div className="relative w-56">
        <video
          src={`http://localhost:3006/api/video/download/${video}`} // Update this to match your API endpoint for video
          controls
          className="w-56 h-32 object-cover"
        />
        <label htmlFor="videoAlt" className="block mt-2">
          Video Alt Text:
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
    </div>
  )}
</div>


      <div className="mb-4">
        <label htmlFor="status" className="block font-semibold mb-2">
          Status
        </label>
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
      <div className="mb-4">
        <label className="block font-semibold mb-2">Priority</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="priority"
              value="low"
              checked={priority === "low"}
              onChange={() => setPriority("low")}
              className="form-radio"
            />
            <span className="ml-2">Low</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={priority === "medium"}
              onChange={() => setPriority("medium")}
              className="form-radio"
            />
            <span className="ml-2">Medium</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="priority"
              value="high"
              checked={priority === "high"}
              onChange={() => setPriority("high")}
              className="form-radio"
            />
            <span className="ml-2">High</span>
          </label>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Testimonial
        </button>
      </div>
    </form>
  );
};

export default EditTestimonial;