import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import f1 from '../../images/Website/msvg/f1.svg';
import f2 from '../../images/Website/msvg/f2.svg';
import f3 from '../../images/Website/msvg/f3.svg';
import f4 from '../../images/Website/msvg/f4.svg';
import f5 from '../../images/Website/msvg/f5.svg';
import f6 from '../../images/Website/msvg/f6.svg';
import f7 from '../../images/Website/msvg/f7.svg';

const Marquee = () => {
  const marqueeRef = useRef(null);

  const svgs = [f1, f2, f3, f4, f5, f6, f7];

  // Concatenate the svgs array to itself for continuous scrolling
  const combinedSvgs = [...svgs, ...svgs];

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
          duration,
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
  }, []);

  return (
    <div className="relative overflow-hidden py-3 w-full">
      <div ref={marqueeRef} className="flex space-x-10 whitespace-nowrap">
        {combinedSvgs.map((svg, index) => (
          <img key={index} src={svg} alt={`SVG ${index + 1}`} className="scrolling-image h-12 md:h-8 lg:h-5 mx-4" />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#F7F4EE] to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#F7F4EE] to-transparent"></div>
    </div>
  );
};

export default Marquee;
