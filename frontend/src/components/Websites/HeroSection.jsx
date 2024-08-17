import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function HeroSection() {
  const [heroSection, setHeroSection] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        // Extract the last part of the URL
        const slug = location.pathname.split('/').filter(Boolean).pop();

        // Fetch data from the API using the slug
        const response = await axios.get(`http://localhost:3006/api/heroSection/front/${slug}`, { withCredentials: true });
        const heroData = response.data;
        setHeroSection(heroData);
      } catch (error) {
        console.error("Error fetching hero section:", error);
      }
    };

    fetchHeroSection();
  }, [location]);

  return (
    <div className="bg-[#114038] flex flex-col items-center justify-center text-center pt-44 pb-16 p-6">
      <h2 className="text-white text-6xl md:text-4xl lg:text-7xl font-serif mb-7">
        {heroSection.heading || "Website"}
      </h2>
      <p className="text-white text-lg md:text-xl lg:text-2xl mb-6">
        {heroSection.subheading || "We create user-centric digital experiences"}
      </p>
      <button className="relative mt-6 py-2 px-7 text-lg font-bold bg-red-500 text-white rounded-xl overflow-hidden group">
        <span className="absolute inset-0 bg-gradient-to-r from-[#003b31] to-yellow-800 transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
        <span className="relative z-10">See our services</span>
      </button>
    </div>
  );
}
