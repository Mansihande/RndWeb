import React, { useLayoutEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { Navigation } from 'swiper/modules'; // Correct import for Navigation
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurWorkComponent = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      imageUrl: "https://kolmdesign.com/wp-content/uploads/2023/09/Websites-Kolm.webp",
      buttonText: "Websites",
      link: "https://kolmdesign.com/projects/websites",
    },
    {
      imageUrl: "https://kolmdesign.com/wp-content/uploads/2023/09/packaging-kolm-sob.webp",
      buttonText: "Branding",
      link: "https://kolmdesign.com/projects/branding",
    },
    {
      imageUrl: "https://kolmdesign.com/wp-content/uploads/2023/09/pitchdeck-kolm.webp",
      buttonText: "Design",
      link: "https://kolmdesign.com/projects/design",
    },
    {
      imageUrl: "https://kolmdesign.com/wp-content/uploads/2023/09/kolmdesign-ux.webp",
      buttonText: "UX/UI",
      link: "https://kolmdesign.com/projects/ux-ui",
    },
    {
      imageUrl: "https://kolmdesign.com/wp-content/uploads/2023/09/Social-media-kolm.webp",
      buttonText: "Social Media",
      link: "https://kolmdesign.com/projects/social-media",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const buttons = containerRef.current.querySelectorAll('.project-button');

      buttons.forEach((button, index) => {
        gsap.fromTo(button, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0,
            scrollTrigger: {
              trigger: button,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
              markers: false,
            }
          }
        );
      });
    }, containerRef);

    return () => {
      // Properly revert all GSAP animations and ScrollTrigger instances
      ctx.revert();
      // Ensure ScrollTrigger instances are killed to avoid lingering effects
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className='relative'>
      <h2 className="text-5xl text-center font-serif py-28">See our work</h2>
      
      <div className="w-full flex xl:px-28 items-center justify-center mt-6" ref={containerRef}>
        <Swiper
          modules={[Navigation]} // Add Navigation module here
          spaceBetween={10}
          slidesPerView={5} // Default: 5 cards
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }} // Enable navigation arrows
          breakpoints={{
            1280: { slidesPerView: 5 },
            1024: { slidesPerView: 3 }, // Show 3 cards on xl screens
            320: { slidesPerView: 1 }, // Show 1 card below xl
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <a // Make the whole card clickable
                href={project.link}
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security feature
                className="relative flex justify-center items-end bg-cover bg-center h-64 rounded-2xl mx-3 transition-transform transform hover:scale-105"
                style={{ backgroundImage: `url(${project.imageUrl})` }}
              >
                {/* Only show button for 5 cards view */}
                {window.innerWidth > 1280 && (
                  <span className="project-button bg-white text-gray-950 font-semibold text-sm rounded-full py-2 px-6 mb-5 shadow hover:bg-gray-200 transition-all duration-300">
                    {project.buttonText}
                  </span>
                )}
              </a>
            </SwiperSlide>
          ))}
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev text-black p-2 rounded-full hover:bg-gray-200"></div>
          <div className="swiper-button-next text-black p-2 rounded-full hover:bg-gray-200"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default OurWorkComponent;
