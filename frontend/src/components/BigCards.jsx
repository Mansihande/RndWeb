import React, { useEffect, useState } from "react";
import trustedData from "../data/trusted.json"; // Adjust the path according to your project structure
import trustedimage1 from '../images/trustedcard1.webp';
import trustedimage2 from '../images/Testimonialsimage1.webp';
import { IoStarSharp, IoStarOutline, IoStarHalfSharp } from 'react-icons/io5';

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<IoStarSharp key={i} />);
    } else if (i < rating) {
      stars.push(<IoStarHalfSharp key={i} />);
    } else {
      stars.push(<IoStarOutline key={i} />);
    }
  }

  return <div className="flex text-yellow-500">{stars}</div>;
};

const TrustedSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating fetching data from JSON file
    setData(trustedData);
  }, []);

  const firstCard = data[0];
  const secondCard = data[1];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8 bg-gray-100 relative  mt-20">
      {/* First Card */}
      {firstCard && (
        <div className={`relative rounded-lg max-w-xl ${firstCard.background} p-4 md:p-8 h-auto`}>
          <div className="flex flex-col space-y-4 h-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="md:pr-36 pl-3">
                <h3 className={`text-2xl md:text-3xl font-bold pb-4 ${firstCard.textColor}`}>
                  {firstCard.heading}
                </h3>
                <a
                  href={firstCard.buttonLink}
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-300 inline-block"
                >
                  {firstCard.buttonText}
                </a>
              </div>
              <img
                src={trustedimage1}
                alt={firstCard.imageAlt}
                className="w-40 h-auto md:w-52 md:h-auto md:absolute md:-top-8 md:right-0 md:transform md:-translate-1/4"
              />
            </div>
            <div className="flex-grow flex items-center justify-center">
              <img
                src={firstCard.srcSet}
                alt={firstCard.imageAlt}
                srcSet={firstCard.srcSet}
                className="mt-4 max-h-24" // Ensure the image doesn't grow too large
              />
            </div>
          </div>
        </div>
      )}

      {/* Second Card */}
      {secondCard && (
        <div className={`relative rounded-lg max-w-xl ${secondCard.background} p-4 md:p-16 h-auto`}>
          <div className="flex flex-col space-y-4 h-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="md:pr-52 pl-3 pb-4">
                <h3 className={`text-2xl md:text-3xl font-bold pb-4 ${secondCard.textColor}`}>
                  {secondCard.heading}
                </h3>
                <a
                  href={secondCard.buttonLink}
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-300 inline-block"
                >
                  {secondCard.buttonText}
                </a>
              </div>
              <img
                src={trustedimage2}
                alt={secondCard.reviewsAlt}
                className="w-40 h-auto md:w-52 md:h-auto md:absolute md:-top-8 md:right-0 md:transform md:-translate-1/4"
              />
            </div>
            <div className="text-md flex items-center font-bold text-white gap-2">
              <span>{secondCard.rating}</span>
              <RatingStars rating={secondCard.rating} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustedSection;
