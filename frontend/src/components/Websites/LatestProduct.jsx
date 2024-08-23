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
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const photoType = "project"; // Replace with your actual logic
        
        console.log("Fetching data with:", { slug, photoType });
        
        const response = await axios.get(`/api/serviceImages/front/${slug}/${photoType}`, { withCredentials: true });
        console.log("Response data:", response.data);
        setProjects(response.data);
        setDataLoaded(true);

      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    let animation;
    if (containerRef.current && dataLoaded) {
      const teamMembers = gsap.utils.toArray(".team-member");
  
      animation = gsap.to(teamMembers, {
        xPercent: -100 * (teamMembers.length - 1),
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
  }, [latestProject, dataLoaded]);
  

  return (
    <div className=" pt-32 ">
     <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif p-4 text-center top-32">
          Latest <span className="text-orange-500">Projects</span>
        </h2>
      <div className="relative " ref={containerRef}>
    
      <div
              id="team-members"
              className="flex whitespace-nowrap overflow-hidden gap-3 px-5 pt-20"
            >
          {latestProject.map(project => (
            <div
              key={project._id}
              className="team-member flex-shrink-0  sm:w-1/2 md:w-96 h-auto transition-transform duration-300 hover:shadow-xl hover:scale-105 relative"
            >
              <img
                src={`/api/serviceImages/download/${project.images}`}
                alt={project.alt}
                className="w-96 h-96 object-cover rounded-3xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}