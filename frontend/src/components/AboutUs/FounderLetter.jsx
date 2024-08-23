import React, { useState, useRef, useEffect } from "react";


import axios from "axios";
import { useLocation } from "react-router-dom";


const WebSolution = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);
  const [service, setService] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`/api/aboutcompany/getAboutcompany`, {
          withCredentials: true,
        });
        const data = response.data.data; // Access the data object
        setService(data);
        setVideoUrl(`/api/image/download/${data.photo}`);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);







  return (
    <section className="relative bg-white overflow-hidden">
      {/* Shape Divider */}

      <div className="mt-44 2xl:mt-96 flex flex-col items-start justify-center mx-8 md:mx-14 lg:mx-36 2xl:mx-80">
        <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 mt-4">
          <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{service?.title}</h2>

<p className="mt-4 text-lg pb-4">
  {service?.description ? (
    <div
      dangerouslySetInnerHTML={{ __html: service.description }}
    />
  ) : (
    "Easily manage your design projects with our convenient portal. Provide important details like design briefs and backlogs, and add an unlimited number of design requests. Our talented designers will promptly get to work on fulfilling your requests, all while enjoying the ease and efficiency of managing your projects in one place."
  )}
</p>
        
          </div>
          <div className="lg:w-1/2">
            <div className="relative -top-5 w-full">
              <img
                src={videoUrl} // Use fetched video URL or fallback to local video
                controls
                className="w-full h-auto rounded-2xl transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default WebSolution;
