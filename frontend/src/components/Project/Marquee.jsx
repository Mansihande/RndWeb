import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const Marquee = ({ speed = 30 }) => {
  const [images, setImages] = useState([]);
  const marqueeRef = useRef(null);

  useEffect(() => {
    // Fetch images from the API
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/serviceImages/companyImages');
        setImages(response.data.data.map(image => image.images)); // Adjust based on your API response structure
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const items = marqueeElement.querySelectorAll('.scrolling-image');

    const totalWidth = Array.from(items).reduce((acc, item) => acc + item.offsetWidth, 0);

    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const duration = viewportWidth > 1024 ? 15 : viewportWidth > 768 ? 30 : 45; // Adjust duration based on screen size

      gsap.fromTo(
        marqueeElement,
        { x: 0 },
        {
          x: -totalWidth / 2,
          duration:speed,
          repeat: -1,
          ease: 'linear',
          onRepeat: () => {
            gsap.set(marqueeElement, { x: 0 });
          },
        }
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [images,speed]); // Depend on images to recalculate when they change

  // Combine images for continuous scrolling
  const combinedImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden py-3 w-full">
      <div ref={marqueeRef} className="flex space-x-10 whitespace-nowrap">
        {combinedImages.map((image, index) => (
          <img
            key={`api-image-${index}`}
            src={`http://localhost:3006/api/serviceImages/download/${image}`}
            alt={`API Image ${index + 1}`}
            className="scrolling-image h-12 md:h-8 lg:h-5 mx-4"
          />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#F7F4EE] to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#F7F4EE] to-transparent"></div>
    </div>
  );
};

export default Marquee;
