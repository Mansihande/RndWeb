import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function LatestProduct() {
  const containerRef = useRef(null);
  const [latestProject, setProjects] = useState([]);
  const location = useLocation();
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const photoType = "project"; // Replace with your actual logic

        console.log("Fetching data with:", { slug, photoType });

        const response = await axios.get(`http://localhost:3006/api/serviceImages/front/${slug}/${photoType}`, { withCredentials: true });
        console.log("Response data:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);



  
  useEffect(() => {
    let animation;
    if (containerRef.current) {
      const teamMembers = gsap.utils.toArray(".team-member");

      animation = gsap.to(teamMembers, {
        xPercent: -50 * (teamMembers.length - 1),
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top 30%",
          end: () => `+=${containerRef.current.offsetWidth}`,
          markers: true, // Enable markers for debugging (optional)
        },
      });
    }

    return () => {
      if (animation) {
        animation.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [latestProject]);

  return (
<>
      <div className="bg-white mb-92">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif p-4 text-center">
          Latest <span className="text-orange-500">Projects</span>
        </h2>
      </div>
      <div className="relative mb-96" ref={containerRef}>
        <div
          id="team-members"
          className="flex whitespace-nowrap overflow-hidden gap-10 px-4 sm:px-8"
        >
          {latestProject.map(project => (
            <div
              key={project._id}
              className="team-member flex-shrink-0 w-60 sm:w-80 md:w-96 h-auto transition-transform duration-300 hover:shadow-xl hover:scale-105 relative"
            >
              <img
                src={`http://localhost:3006/api/serviceImages/download/${project.images}`} // Ensure the correct path
                alt={project.alt}
                className="object-cover rounded-3xl"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
