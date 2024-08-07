import React, { useState, useRef, useEffect } from "react";
import linksvg from "../../images/link.svg";
import FastOnBordings from "../../images/videos/FastOnBoarding.mp4";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { gsap } from "gsap";

const DetailsData = [
  {
    question: "All-in-one collaborative platform",
    answer:
      "Our all-in-one solution has been developed with the aim of streamlining the collaborative process by providing a centralized platform. This platform enables you to easily manage requests, organize files, integrate with existing workflows, and communicate with your designers, all within a single location. By consolidating these key functionalities, our solution eliminates the need for multiple tools and disparate communication channels",
  },
  {
    question: "Integrated with Trello and Slack",
    answer:
      "For the convenience of design requests, we utilize Trello as our designated platform. Through Trello, you have the ability to submit and track your design requests effectively. In terms of communication, we employ Slack as our preferred tool for seamless interaction between our designers and clients. With Slack, you can engage in real-time discussions, exchange valuable feedback, and maintain a transparent and efficient line of communication throughout the design process.",
  },
];

export default function CraftLeft() {
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
    <div className="flex flex-col items-center">
  
      <div className="flex flex-col lg:flex-row-reverse 2xl:justify-center gap-10  lg:px-28  w-full">
        {/* Text Content for Large Screens */}
        <div className="w-full lg:w-1/2 2xl:w-1/3 px-4 flex flex-col justify-center order-1">
          <h2 className="text-4xl font-bold pb-6">
            <span className="text-[#f55f42]">Fast onboarding: </span> start
            using our service in no time
          </h2>
          <p className="mt-4 text-lg pb-4">
            Once you complete the payment process, you will receive an email
            within 24 hours containing your account details, including your
            login credentials and instructions on how to access your personal
            portal. You can start using the service right away by logging into
            your personal portal.
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
                src={FastOnBordings}
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
