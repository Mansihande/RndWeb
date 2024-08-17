import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const Marquee = ({ speed = 15 }) => {
  const marqueeRef = useRef(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/homepage/marquee');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Concatenate the services array to itself for continuous scrolling
  const combinedServices = [...services, ...services];

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const items = marqueeElement.querySelectorAll('.scrolling-text');

    const totalWidth = Array.from(items).reduce((acc, item) => acc + item.offsetWidth, 0);

    gsap.fromTo(
      marqueeElement,
      { x: 0 },
      {
        x: -totalWidth / 2, // Adjust to half the total width for seamless looping
        duration: speed,
        repeat: -1,
        ease: 'linear',
        onRepeat: () => {
          gsap.set(marqueeElement, { x: 0 });
        },
      }
    );
  }, [combinedServices, speed]);

  return (
    <div className="bg-[#114038] py-3 relative -z-10 overflow-hidden">
      <div ref={marqueeRef} className="flex space-x-10 whitespace-nowrap">
        {combinedServices.map((service, index) => (
          <span key={index} className="scrolling-text text-xl font-semibold text-white">
            {service} <span className="scroll-dot text-[#33776B] text-3xl pl-8">●</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
