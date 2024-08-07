import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IoMdClose, IoMdFunnel } from 'react-icons/io';

// Import images
import temp1 from '../../images/Website/msvg/video/temp1.webp';
import temp2 from '../../images/Website/msvg/video/temp2.webp';
import temp3 from '../../images/Website/msvg/video/temp3.webp';
import temp4 from '../../images/Website/msvg/video/temp4.webp';
import temp5 from '../../images/Website/msvg/video/temp5.webp';
import temp6 from '../../images/Website/msvg/video/temp6.webp';
import temp7 from '../../images/Website/msvg/video/temp7.webp';
import temp8 from '../../images/Website/msvg/video/temp8.webp';
import temp9 from '../../images/Website/msvg/video/temp9.webp';
import temp10 from '../../images/Website/msvg/video/temp10.webp';
import temp11 from '../../images/Website/msvg/video/temp11.webp';
import temp12 from '../../images/Website/msvg/video/temp12.webp';

const templates = [
  { id: 1, title: 'All', content: 'Design Template Content', images: [{ src: temp1, title: 'Image 1' }, { src: temp2, title: 'Image 2' }, { src: temp3, title: 'Image 3' }, { src: temp4, title: 'Image 4' }, { src: temp5, title: 'Image 5' }, { src: temp6, title: 'Image 6' }] },
  { id: 2, title: 'Design', content: 'Design Template Content', images: [{ src: temp7, title: 'Image 7' }, { src: temp8, title: 'Image 8' }, { src: temp9, title: 'Image 9' }] },
  { id: 3, title: 'E-commerce', content: 'E-commerce Template Content', images: [{ src: temp10, title: 'Image 10' }, { src: temp11, title: 'Image 11' }, { src: temp12, title: 'Image 12' }] },
  { id: 4, title: 'Social Media', content: 'Social Media Template Content', images: [{ src: temp1, title: 'Image 1' }, { src: temp2, title: 'Image 2' }, { src: temp3, title: 'Image 3' }] },
  { id: 5, title: 'Websites', content: 'Websites Template Content', images: [{ src: temp4, title: 'Image 4' }, { src: temp5, title: 'Image 5' }, { src: temp6, title: 'Image 6' }, { src: temp7, title: 'Image 7' }] },
];

const ProjectsSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(templates[0].title);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (selectedTemplate) {
      imageRefs.current.forEach((image, index) => {
        gsap.fromTo(
          image,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3 }
        );
      });
    }
  }, [selectedTemplate]);

  const handleItemClick = (template) => {
    if (selectedTemplate.id === template.id) return;

    gsap.to(imageRefs.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setSelectedTemplate(template);
        setCurrentFilter(template.title);
        setIsFilterOpen(false); // Close the filter menu
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
      <div className="absolute inset-x-0 top-0">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            className="fill-current text-[#F7F4EE]"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          />
        </svg>
      </div>

      <button
        className="sm:hidden mt-40 mx-0 w-auto h-auto flex items-center justify-start px-4 py-2 text-xl font-inter focus:outline-none bg-[#F55F42] text-white rounded-lg"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <IoMdFunnel className="mr-2" />
        Filter
      </button>

      {/* Template title buttons for desktop view */}
      <div className="hidden sm:flex space-x-8 mt-40">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleItemClick(template)}
            className={`px-4 py-2 sm:text-lg md:text-xl lg:text-2xl font-inter focus:outline-none ${selectedTemplate.id === template.id ? 'text-red-500' : 'text-gray-800 border-transparent'}`}
          >
            {template.title}
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
          <div className="flex flex-col  space-y-4 mt-10">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleItemClick(template)}
                className={`px-4 py-2 text-lg font-inter focus:outline-none ${selectedTemplate.id === template.id ? 'text-red-500' : 'text-gray-800 border-transparent'}`}
              >
                {template.title}
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
        <span>Current Filter: {currentFilter}</span>
      </div>

      {selectedTemplate && (
        <div className="mt-12 text-center mx-10 sm:mx-20">
          <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {selectedTemplate.images && selectedTemplate.images.length > 0 ? (
              selectedTemplate.images.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => handleImageClick(image.src)}
                >
                  <img
                    src={image.src}
                    alt={`${selectedTemplate.title} ${image.title}`}
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="w-full h-auto object-cover rounded-lg shadow-xl border"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 opacity-0 hover:opacity-100 hover:rounded-lg transition-opacity duration-300 ease-in-out text-white text-lg font-semibold p-2">
                    {image.title}
                  </div>
                </div>
              ))
            ) : (
              <p>No images available for this template.</p>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen image view */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeFullscreen}
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