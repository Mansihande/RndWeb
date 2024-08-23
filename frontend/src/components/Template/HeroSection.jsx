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
        const response = await axios.get(`/api/heroSection/front/${slug}`, { withCredentials: true });
        const heroData = response.data;
        setHeroSection(heroData);
      } catch (error) {
        console.error("Error fetching hero section:", error);
      }
    };

    fetchHeroSection();
  }, [location]);

  return (
    <div className="bg-[#F7F4EE] flex flex-col items-center justify-center text-center pt-44 pb-16 p-6">
      <h2 className="text-black text-6xl md:text-4xl lg:text-7xl font-serif mb-7">
        {heroSection.heading || "Premium templates"}
      </h2>
      <p className="text-black text-lg md:text-xl lg:text-2xl mb-6">
        {heroSection.subheading || "Have a taste of Kolm"}
      </p>

    </div>
  );
}