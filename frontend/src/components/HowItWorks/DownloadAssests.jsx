import React, { useState, useRef, useEffect } from "react";
import linksvg from "../../images/link.svg";
import KolmPlatform from "../../images/videos/KolmPlatform.mp4";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { gsap } from "gsap";

const DetailsData = [
  {
    question: "File formats",
    answer:
"We offer a range of file formats, including PNG, JPEG, and SVGs, to accommodate your specific needs. In addition, we provide files that are compatible with Canva, allowing for seamless integration into your preferred design platform."  },
  {
    question: "Pause or cancel subscription",
    answer:
      "If you find your business with a lighter workload, you have the option to temporarily pause your subscription. You can reactivate it at any time and utilize the remaining duration of your subscription. Additionally, cancellation is available on a monthly basis, depending on the terms of your subscription. These options are easily accessible within your account settings.",
  },
];

export default function DownloadAssets() {
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
      <div className="overflow-hidden">
        <img
          src={linksvg}
          alt="linksvg"
          className="rotate-90 w-[500px] hidden md:block"
        />
      </div>

      <div className="flex flex-col lg:flex-row-reverse 2xl:justify-center gap-10  lg:px-28  w-full">
        {/* Text Content for Large Screens */}
        <div className="w-full lg:w-1/2 2xl:w-1/3 px-4 flex flex-col justify-center order-1">
          <h2 className="text-4xl font-bold pb-6">
          Download <span className="text-[#f55f42]">assets </span>& repeat the process 
            using our service in no time
          </h2>
          <p className="mt-4 text-lg pb-4">
          Our process involves handling your requests one-at-a-time, ensuring that each design is given the attention it deserves. You’ll have the convenience of downloading your assets directly from our portal.
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
                src={KolmPlatform}
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
