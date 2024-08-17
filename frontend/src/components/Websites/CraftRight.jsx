import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import gsap from "gsap";

export default function CraftRight() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);
  const [service, setService] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const response = await axios.get(`http://localhost:3006/api/serviceDetails/front/${slug}`, { withCredentials: true });
        const data = response.data.data[0]; // Access the first item in the data array
        setService(data);
        setVideoUrl(`http://localhost:3006/api/video/download/${data.video}`);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    if (openIndex !== null) {
      gsap.fromTo(
        answerRefs.current[openIndex],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [openIndex]);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      gsap.to(answerRefs.current[openIndex], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => setOpenIndex(null),
      });
    } else {
      setOpenIndex(index);
    }
  };

  // Use service data if available, otherwise fallback to static data
  const faqData = service ? service.questions : [];

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-col lg:flex-row 2xl:justify-center gap-10 px-5 lg:px-28 w-full">
        {/* Text Content for Large Screens */}
        <div className="w-full lg:w-1/2 2xl:w-1/3 px-4 flex flex-col justify-center order-1">
          <h2 className="text-4xl font-bold pb-6">
            {service?.heading || "hello"}
          </h2>
          <p className="mt-4 text-lg pb-4">
            {service?.description ? (
              <div dangerouslySetInnerHTML={{ __html: service.description }} />
            ) : (
              "Easily manage your design projects with our convenient portal. Provide important details like design briefs and backlogs, and add an unlimited number of design requests. Our talented designers will promptly get to work on fulfilling your requests, all while enjoying the ease and efficiency of managing your projects in one place."
            )}
          </p>

          {faqData.map((faq, index) => (
            <div key={index} className="mb-2 sm:mb-4">
              <div
                className="flex justify-between items-center px-4 sm:px-7 md:px-10 lg:px-14 bg-[#f9f7f1] rounded-[20px] py-3 sm:py-4 lg:py-[17px] cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-inter font-medium">
                  {faq.question}
                </h3>
                <span className="text-lg sm:text-xl lg:text-2xl">
                  {openIndex === index ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </span>
              </div>
              <div
                ref={(el) => (answerRefs.current[index] = el)}
                className={`overflow-hidden ${openIndex === index ? "block" : "hidden"}`}
              >
                <div className="p-3 sm:p-4 lg:p-5 px-8 sm:px-10 lg:px-12 font-inter text-sm sm:text-base lg:text-base text-justify">
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Content */}
        <div className="w-full lg:w-1/2 2xl:w-1/3 flex items-center justify-center order-2">
          <div className="relative rounded-2xl bg-[#003b31] m-10 overflow-hidden group transition-all duration-300">
            <div className="transition-transform transform group-hover:scale-105 group-hover:translate-x-1 group-hover:translate-y-1">
              <video
                src={videoUrl } // Use fetched video URL or fallback to local video
                autoPlay
                muted
                loop
                className="w-full h-auto rounded-2xl transition-all duration-300"
              />
            </div>
            <div className="absolute inset-0 rounded-2xl border-4 border-transparent m-10 transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
