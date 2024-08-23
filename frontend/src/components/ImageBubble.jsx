import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageBubble = ({ homeHero }) => {
  const [photos, setPhotos] = useState([]);

  // Fetch photos from the server
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosResponse = await axios.get('/api/homehero/photo', {
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
      const response = await axios.get(`/api/image/download/${photoName}`, {
        responseType: 'blob',
        withCredentials: true,
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error(`Error fetching photo ${photoName}:`, error);
      return null;
    }
  };

  if (!homeHero || !homeHero.labels || !homeHero.smallCircles) {
    return <div className="text-center">Loading...</div>;
  }

  const labels = homeHero.labels;
  const smallCircles = homeHero.smallCircles;

  // Define positions for different screen sizes
  const imagePositions = {
    large: [
      { top: '33%', left: '50%', size: '5vw' },
      { top: '57%', left: '55%', size: '10vw' },
      { top: '42%', left: '70%', size: '8vw' },
      { top: '17%', left: '55%', size: '4vw' },
    ],
    medium: [
      { top: '34%', left: '40%', size: '6vw' },
      { top: '67%', left: '55%', size: '9vw' },
      { top: '42%', left: '65%', size: '7vw' },
      { top: '8%', left: '65%', size: '6vw' },
    ],
    small: [
      { top: '19%', left: '35%', size: '7vw' },
      { top: '43%', left: '50%', size: '8vw' },
      { top: '22%', left: '55%', size: '6vw' },
      { top: '4%', left: '40%', size: '5vw' },
    ],
  };

  const labelPositions = {
    large: [
      { top: '23%', left: '45%', size: '4vw' },
      { top: '53%', left: '45%', size: '3.5vw' },
      { top: '26%', left: '65%', size: '3vw' },
      { top: '48%', left: '55%', size: '4vw' },
    ],
    medium: [
      { top: '14%', left: '35%', size: '6vw' },
      { top: '50%', left: '30%', size: '5vw' },
      { top: '25%', left: '70%', size: '6vw' },
      { top: '55%', left: '55%', size: '4vw' },
    ],
    small: [
      { top: '9%', left: '30%', size: '4vw' },
      { top: '33%', left: '30%', size: '3.5vw' },
      { top: '14%', left: '50%', size: '3vw' },
      { top: '38%', left: '30%', size: '4vw' },
    ],
  };

  const smallCirclePositions = {
    large: [
      { top: '23%', left: '70%', size: '0.7vw', color: '#FF6347' },
      { top: '37%', left: '65%', size: '1.5vw', color: '#FFD700' },
      { top: '43%', left: '38%', size: '2vw', color: '#87CEEB' },
    ],
    medium: [
      { top: '25%', left: '70%', size: '0.9vw', color: '#FF6347' },
      { top: '30%', left: '60%', size: '1.2vw', color: '#FFD700' },
      { top: '40%', left: '30%', size: '1.8vw', color: '#87CEEB' },
    ],
    small: [
      { top: '10%', left: '60%', size: '1vw', color: '#FF6347' },
      { top: '25%', left: '55%', size: '1.5vw', color: '#FFD700' },
      { top: '35%', left: '25%', size: '1.5vw', color: '#87CEEB' },
    ],
  };

  const screenSize = () => {
    if (window.innerWidth >= 1440) return 'large';
    if (window.innerWidth >= 768) return 'medium';
    return 'small';
  };

  const currentSize = screenSize();

  return (
    <div className="relative bg-[#f8f3e7] p-4 min-h-screen overflow-hidden">
      {photos.map((photo, index) => {
        const position = imagePositions[currentSize][index];
        if (!position) return null; // Check if position is defined
        return (
          <img
            key={index}
            src={photo}
            alt={`Dynamic ${index}`}
            className="absolute rounded-full object-cover"
            style={{
              top: position.top,
              left: position.left,
              width: position.size,
              height: position.size,
            }}
          />
        );
      })}
      {labels.map((label, index) => {
        const position = labelPositions[currentSize][index];
        if (!position) return null; // Check if position is defined
        return (
          <div
            key={index}
            className="absolute rounded-full text-white flex items-center justify-center"
            style={{
              top: position.top,
              left: position.left,
              backgroundColor: label.color,
              padding: '0.5rem',
              width: position.size,
              height: position.size,
            }}
          >
            {label.label}
          </div>
        );
      })}
      {smallCircles.map((circle, index) => {
        const position = smallCirclePositions[currentSize][index];
        if (!position) return null; // Check if position is defined
        return (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              top: position.top,
              left: position.left,
              backgroundColor: circle.color,
              width: position.size,
              height: position.size,
            }}
          />
        );
      })}
    </div>
  );
};

export default ImageBubble;
