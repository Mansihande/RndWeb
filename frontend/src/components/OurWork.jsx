import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { Navigation } from 'swiper/modules'; // Correct import for Navigation
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios'; // Import axios for API calls

gsap.registerPlugin(ScrollTrigger);

const OurWorkComponent = () => {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]); // State to hold fetched projects

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/homepage/ourwork');
        const projectsData = await Promise.all(
          response.data.map(async (project) => {
            try {
              const imageResponse = await axios.get(`http://localhost:3006/api/logo/download/${project.photo}`, {
                responseType: 'blob', // Request the image as a blob
              });
              const imageUrl = URL.createObjectURL(imageResponse.data); // Create a URL for the blob
              return {
                name: project.name,
                imageUrl: imageUrl, // Use the created URL
                link: '/projects',
              };
            } catch (error) {
              console.error('Error fetching image:', error);
              return {
                name: project.name,
                imageUrl: '', // Fallback to an empty string or a placeholder image
                link: '/projects',
              };
            }
          })
        );
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const buttons = containerRef.current.querySelectorAll('.project-button');

      buttons.forEach((button) => {
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
      ctx.revert();
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
              <a 
                href={project.link}
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative flex justify-center items-end bg-cover bg-center h-64 rounded-2xl mx-3 transition-transform transform hover:scale-105 ">
                <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover rounded-2xl" />
                {window.innerWidth > 1280 && (
                  <span className="project-button bg-white text-gray-950 font-semibold text-sm rounded-full py-2 px-6  shadow hover:bg-gray-200 transition-all duration-300 absolute bottom-0 mb-12 transform translate-y-full">
                    {project.name}
                  </span>
                )}
              </a>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev text-black p-2 rounded-full hover:bg-gray-200"></div>
          <div className="swiper-button-next text-black p-2 rounded-full hover:bg-gray-200"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default OurWorkComponent;
