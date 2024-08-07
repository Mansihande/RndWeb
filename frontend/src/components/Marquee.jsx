import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Marquee = () => {
  const marqueeRef = useRef(null);

  const services = [
    'Websites', 'Branding', 'Design Subscriptions', 'UX / UI', 
    'Website Maintenance', 'Social Media'
  ];

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
        duration: 15,
        repeat: -1,
        ease: 'linear',
        onRepeat: () => {
          gsap.set(marqueeElement, { x: 0 });
        },
      }
    );
  }, []);

  return (
    <div className=" bg-[#114038] py-3 relative -z-10  overflow-hidden">
      <div ref={marqueeRef} className="flex space-x-10 whitespace-nowrap ">
        {combinedServices.map((service, index) => (
          <span key={index} className="scrolling-text text-xl font-semibold text-white text-bold">
            {service} <span className="scroll-dot text-[#33776B] text-3xl pl-8">●</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
