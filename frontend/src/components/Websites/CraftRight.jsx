import React, { useState, useRef, useEffect } from "react";
import linksvg from "../../images/link.svg";
import TrelloBoardSize from "../../images/videos/TrelloBoardSize.mp4";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { gsap } from "gsap";

const DetailsData = [
  {
    question: "Prioritize your requests in your queue",
    answer:
"For optimal prioritization, we recommend placing important tasks at the forefront within your Trello board. This ensures a focused approach as tasks are addressed one-by-one.You have the flexibility to add as many design requests as you wish. Once a task is completed and approved by the client, it will be moved from the 'In Progress' column to the 'Approved' column, providing a clear visual indication of progress. " 
 },
  {
    question: "Unlimited revisions",
    answer:
"We provide a 100% satisfaction guarantee, ensuring unlimited revisions to meet your expectations. Our utmost priority is to ensure that our clients are completely satisfied with our solutions. We strive to go above and beyond to deliver results that exceed your expectations and leave you fully happy with our services."  },
];

export default function CraftRight() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

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

  return (
    <div className="flex flex-col items-center mt-20">
  

      <div className="flex flex-col lg:flex-row 2xl:justify-center gap-10 px-5  lg:px-28  w-full">
        {/* Text Content for Large Screens */}
        <div className="w-full lg:w-1/2 2xl:w-1/3 px-4 flex flex-col justify-center order-1">
          <h2 className="text-4xl font-bold pb-6">
           Add <span className="text-[#f55f42]">Unlimited </span>requests
            using our service in no time
          </h2>
          <p className="mt-4 text-lg pb-4">
          Easily manage your design projects with our convenient portal. Provide important details like design briefs and backlogs, and add an unlimited number of design requests. Our talented designers will promptly get to work on fulfilling your requests, all while enjoying the ease and efficiency of managing your projects in one place.
          </p>

          {DetailsData.map((faq, index) => (
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
                className={`overflow-hidden ${
                  openIndex === index ? "block" : "hidden"
                }`}
              >
                <div className="p-3 sm:p-4 lg:p-5 px-8 sm:px-10 lg:px-12 font-inter text-sm sm:text-base lg:text-base text-justify">
                  <p>{faq.answer}</p>
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
                src={TrelloBoardSize}
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
