import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoStarSharp, IoStarHalfSharp, IoStarOutline } from 'react-icons/io5';



export default function HeroSection({ serviceGridRef }) {
  const [heroSection, setHeading] = useState("");
  const [subHeading, setsubHeading] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const response = await axios.get('/api/pageHeading/heading?pageType=aboutcompany', { withCredentials: true });
        const { heading,subheading } = response.data;
        setHeading(heading || '');
        setsubHeading(subheading || '')
      } catch (error) {
        console.error(error);
      }
    };


    fetchHeadings();

  }, []);

  const scrollToServices = () => {
    if (serviceGridRef.current) {
      serviceGridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#114038] flex flex-col items-center justify-center text-center pt-44 pb-16 p-6">
      <h2 className="text-white text-6xl md:text-4xl lg:text-7xl font-serif mb-3">
        {heroSection}
      </h2>
      <p className="text-white text-lg md:text-xl lg:text-2xl mb-6">
      {subHeading}</p>
    </div>
  );
}
