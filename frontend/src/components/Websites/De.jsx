import React, { useEffect, useRef , useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DesignProcess1 from "../../images/DesignProcess/DesignProcess1.webp";
import DesignProcess2 from "../../images/DesignProcess/DesignProcess2.webp";
import DesignProcess3 from "../../images/DesignProcess/DesignProcess3.webp";
import DesignProcess4 from "../../images/DesignProcess/DesignProcess4.webp";
import DesignProcess5 from "../../images/DesignProcess/DesignProcess5.webp";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function HowRndHelp() {
  const containerRef = useRef(null);
  const fadeInContainerRef = useRef(null);
  const [services, setServices] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const response = await axios.get(`http://localhost:3006/api/designProcess/front/${slug}`, { withCredentials: true });
        const data = response.data.data;
        setServices(data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

  
  useEffect(() => {
    const fadeInElements = fadeInContainerRef.current.querySelectorAll('.fade-in');
    const animations = [];

    fadeInElements.forEach((el, index) => {
      const animation = gsap.fromTo(
        el,
        { opacity: 0.5, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
            onUpdate: (self) => {
              const numberEl = document.getElementById(`progress-number-${index}`);
              if (numberEl) {
                numberEl.style.opacity = self.progress;
              }
            },
          },
        }
      );
      animations.push(animation.scrollTrigger);
    });

    const progressLineAnimation = gsap.fromTo(
      '.progress-line',
      { height: '0%' },
      {
        height: '100%',
        scrollTrigger: {
          trigger: fadeInContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );
    animations.push(progressLineAnimation.scrollTrigger);

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [services]);

  return (
    <div className="p-4 md:p-8">
    <div ref={containerRef} className="flex flex-col items-center mt-12 md:mt-24 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">Our Design Process</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          You can expect a collaborative process that will combine multiple services to elevate your brand, story, user experience, and overall customer success.
        </p>
      </div>
    </div>
    <div className="relative">
      <div ref={fadeInContainerRef} className="flex flex-col items-center space-y-6 mt-12 pb-20">
        <div className="absolute inset-0 flex flex-col lg:left-10 xl:left-40 2xl:left-96 justify-items-start hidden lg:flex">
          <div className="w-1 bg-gray-300 progress-line" />
          {services.map((_, index) => (
            <div
              key={index}
              className="absolute top-1/2 -left-4 transform -translate-y-44 bg-teal-700 text-white text-lg font-medium rounded-full w-10 h-10 flex items-center justify-center"
              style={{ top: `${(index + 1) * 20}%` }}
              id={`progress-number-${index}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        {services.map((service, index) => (
          <div
            key={service._id}
            className="fade-in border border-lg border-black rounded-xl p-6 flex flex-col md:flex-row items-center space-x-0 md:space-x-6 bg-white shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 max-w-3xl mx-auto relative"
          >
            <img
              src={`http://localhost:3006/api/designProcess/download/${service.image}`}
              alt={service.alt}
              className="w-full h-52 md:w-52 md:h-52 rounded-md object-cover mb-4 md:mb-0"
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-semibold">{service.title}</h3>
                <span className="bg-teal-700 text-white text-xs font-medium px-3 py-1 rounded-full">{service.hours}</span>
              </div>
              <p className="text-md md:text-xl text-black mb-2">{service.subheading}</p>
              <p className="text-sm md:text-md text-black">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
