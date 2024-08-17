import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageBubbleright = ({ homeHero }) => {
  const [photos, setPhotos] = useState([]);

  // Fetch photos from the server
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosResponse = await axios.get('http://localhost:3006/api/homehero/photo', {
          withCredentials: true,
        });

        const photoNames = photosResponse.data.data.map(photoObj => photoObj.photo[0]);
        const photoPromises = photoNames.map(photoName => fetchPhoto(photoName));
        const photoUrls = await Promise.all(photoPromises);
        setPhotos(photoUrls);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const fetchPhoto = async (photoName) => {
    try {
      const response = await axios.get(`http://localhost:3006/api/image/download/${photoName}`, {
        responseType: 'blob',
        withCredentials: true,
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error(`Error fetching photo ${photoName}:`, error);
      return null;
    }
  };

  // Extract labels and small circles from homeHero prop
  const labels = homeHero?.labels || [];
  const smallCircles = homeHero?.smallCircles || [];
  const heading = homeHero?.heading || {};
  const paragraph = homeHero?.paragraph?.text || '';

  // Define positions for different screen sizes
  const imagePositions = {
    large: [
      { top: '33%', right: '50%', size: '5vw' },
      { top: '57%', right: '55%', size: '10vw' },
      { top: '42%', right: '70%', size: '8vw' },
      { top: '17%', right: '55%', size: '4vw' },
    ],
    medium: [
      { top: '34%', right: '40%', size: '6vw' },
      { top: '67%', right: '55%', size: '9vw' },
      { top: '42%', right: '65%', size: '7vw' },
      { top: '8%', right: '65%', size: '6vw' },
    ],
    small: [
      { top: '19%', right: '35%', size: '7vw' },
      { top: '43%', right: '50%', size: '8vw' },
      { top: '22%', right: '55%', size: '6vw' },
      { top: '4%', right: '40%', size: '5vw' },
    ],
  };

  const labelPositions = {
    large: [
      { top: '23%', right: '45%', size: '4vw' },
      { top: '53%', right: '45%', size: '3.5vw' },
      { top: '26%', right: '65%', size: '3vw' },
      { top: '48%', right: '55%', size: '4vw' },
    ],
    medium: [
      { top: '14%', right: '35%', size: '6vw' },
      { top: '50%', right: '35%', size: '3.5vw' },
      { top: '25%', right: '70%', size: '6vw' },
      { top: '55%', right: '55%', size: '4vw' },
    ],
    small: [
      { top: '9%', right: '30%', size: '4vw' },
      { top: '33%', right: '30%', size: '3.5vw' },
      { top: '14%', right: '50%', size: '3vw' },
      { top: '33%', right: '40%', size: '4vw' },
    ],
  };

  const smallCirclePositions = {
    large: [
      { top: '23%', right: '70%', size: '0.7vw', color: '#FF6347' },
      { top: '37%', right: '65%', size: '1.5vw', color: '#FFD700' },
      { top: '43%', right: '38%', size: '2vw', color: '#87CEEB' },
    ],
    medium: [
      { top: '25%', right: '70%', size: '0.9vw', color: '#FF6347' },
      { top: '30%', right: '60%', size: '1.2vw', color: '#FFD700' },
      { top: '35%', right: '35%', size: '1.8vw', color: '#87CEEB' },
    ],
    small: [
      { top: '10%', right: '60%', size: '1vw', color: '#FF6347' },
      { top: '25%', right: '55%', size: '1.5vw', color: '#FFD700' },
      { top: '30%', right: '30%', size: '1.5vw', color: '#87CEEB' },
    ],
  };

  // Determine the screen size
  const screenSize = () => {
    if (window.innerWidth >= 1440) return 'large';
    if (window.innerWidth >= 768) return 'medium';
    return 'small';
  };

  const currentSize = screenSize();

  // Get the last four photos if available
  const imageElements = photos.slice(-4).map((image, index) => {
    const positionStyle = {
      top: imagePositions[currentSize][index].top,
      right: imagePositions[currentSize][index].right,
      width: imagePositions[currentSize][index].size,
      height: imagePositions[currentSize][index].size,
    };

    return (
      <div key={index} style={positionStyle} className="absolute flex items-center justify-center">
        <div className="bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${image})`, width: '100%', height: '100%' }} />
      </div>
    );
  });

  const labelElements = labels.slice(-4).map((label, index) => {
    const positionStyle = {
      top: labelPositions[currentSize][index].top,
      right: labelPositions[currentSize][index].right,
      width: labelPositions[currentSize][index].size,
      height: labelPositions[currentSize][index].size,
    };

    return (
      <div key={index} style={{ ...positionStyle, backgroundColor: label.color }} className="absolute flex items-center justify-center rounded-full text-white text-[0.5rem] md:text-xs p-1.5 md:p-2.5">
        {label.label}
      </div>
    );
  });

  const smallCircleElements = smallCirclePositions[currentSize].map((position, index) => {
    const positionStyle = {
      top: position.top,
      right: position.right,
      width: position.size,
      height: position.size,
      backgroundColor: position.color,
    };

    return (
      <div key={index} style={positionStyle} className="absolute flex items-center justify-center rounded-full">
        {/* Empty Small Circle */}
      </div>
    );
  });

  return (
    <div className="relative bg-[#f8f3e7] p-4" style={{ height: '100%', overflow: 'hidden' }}>
      {imageElements}
      {labelElements}
      {smallCircleElements}
      
 
    </div>
  );
};

export default ImageBubbleright;
