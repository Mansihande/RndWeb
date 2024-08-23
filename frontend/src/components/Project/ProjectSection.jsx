import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { IoMdClose, IoMdFunnel } from 'react-icons/io';

const ProjectsSection = () => {
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/serviceImages/getAllPackagesFront');
        setData(response.data.data);
        const categories = Object.keys(response.data.data).filter(category => response.data.data[category].images.length > 0);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const categories = Object.keys(data).filter(category => data[category].images.length > 0);

  useEffect(() => {
    if (selectedCategory) {
      imageRefs.current.forEach((image, index) => {
        gsap.fromTo(
          image,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, delay: index * 0.1 }
        );
      });
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) return;

    gsap.to(imageRefs.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setSelectedCategory(category);
        setIsFilterOpen(false);
      },
    });
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -top-20 relative bg-white overflow-hidden">
      <button
        className="sm:hidden mt-40 mx-0 w-auto h-auto flex items-center justify-start px-4 py-2 text-xl font-inter focus:outline-none bg-[#F55F42] text-white rounded-lg"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <IoMdFunnel className="mr-2" />
        Filter
      </button>

      {/* Category buttons for desktop view */}
      <div className="hidden sm:flex space-x-8 mt-40">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 sm:text-lg md:text-xl lg:text-2xl font-inter focus:outline-none ${selectedCategory === category ? 'text-red-500' : 'text-gray-800 border-transparent'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter options for mobile view */}
      {isFilterOpen && (
        <div className="sm:hidden fixed h-auto inset-0 bg-white z-50 p-4">
          <button
            className="absolute top-4 right-4 text-gray-800 text-3xl"
            onClick={() => setIsFilterOpen(false)}
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col space-y-4 mt-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 text-lg font-inter focus:outline-none ${selectedCategory === category ? 'text-red-500' : 'text-gray-800 border-transparent'}`}
              >
                {category}
              </button>
            ))}
            <button
              className="px-4 py-2 text-lg font-inter mt-4 bg-[#F55F42] text-white rounded-lg"
              onClick={() => setIsFilterOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Current Filter Text */}
      <div className="mt-4 sm:hidden text-[#F55F42] text-base">
        <span>Current Filter: {selectedCategory}</span>
      </div>

      {selectedCategory && data[selectedCategory] && (
        <div className="mt-12 text-center mx-10 sm:mx-20">
          <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {data[selectedCategory].images.map((image, index) => (
              <div
                key={image._id}
                className="relative cursor-pointer"
                onClick={() => handleImageClick(image.images)}
              >
                <img
                  src={`http://localhost:3006/api/serviceImages/download/${image.images}`}
                  alt={image.alt}
                  ref={(el) => (imageRefs.current[index] = el)}
                  className="w-full h-auto object-cover rounded-lg shadow-xl border"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 opacity-0 hover:opacity-100 hover:rounded-lg transition-opacity duration-300 ease-in-out text-white text-lg font-semibold p-2">
                  {image.alt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={`http://localhost:3006/api/serviceImages/download/${fullscreenImage}`}
              alt="Fullscreen view"
              className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl md:text-4xl p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity"
              onClick={closeFullscreen}
              style={{ marginTop: '-16px', marginRight: '-16px' }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;