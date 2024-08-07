import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DesignProcess1 from "../../images/DesignProcess/DesignProcess1.webp";
import DesignProcess2 from "../../images/DesignProcess/DesignProcess2.webp";
import DesignProcess3 from "../../images/DesignProcess/DesignProcess3.webp";
import DesignProcess4 from "../../images/DesignProcess/DesignProcess4.webp";
import DesignProcess5 from "../../images/DesignProcess/DesignProcess5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function HowRndHelp() {
  const containerRef = useRef(null);
  const fadeInContainerRef = useRef(null);

  useEffect(() => {
    const fadeInElements = fadeInContainerRef.current.querySelectorAll(".fade-in");
    fadeInElements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0.5, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 60%",
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
    });

    gsap.fromTo(
      ".progress-line",
      { height: "0%" },
      {
        height: "100%",
        scrollTrigger: {
          trigger: fadeInContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
  }, []);

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
          {/* Only show the progress line for screens md and above */}
          <div className="absolute inset-0 flex flex-col lg:left-10 xl:left-40 2xl:left-96 justify-items-start hidden lg:flex">
            <div className="w-1 bg-gray-300 progress-line" />
            {[0, 1, 2, 3, 4].map((index) => (
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
          {[DesignProcess1, DesignProcess2, DesignProcess3, DesignProcess4, DesignProcess5].map((imgSrc, index) => (
            <div
              key={index}
              className="fade-in border border-lg border-black rounded-xl p-6 flex flex-col md:flex-row items-center space-x-0 md:space-x-6 bg-white shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 max-w-3xl mx-auto relative"
            >
              <img
                src={imgSrc}
                alt={`Design Process ${index + 1}`}
                className="w-full h-52 md:w-52 md:h-52 rounded-md object-cover mb-4 md:mb-0"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold">Title {index + 1}</h3>
                  <span className="bg-teal-700 text-white text-xs font-medium px-3 py-1 rounded-full">1-2 HOURS</span>
                </div>
                <p className="text-md md:text-xl text-black mb-2">Figure out what to do...</p>
                <p className="text-sm md:text-md text-black">
                  After completing your payment, access your portal to unlock project management tools and direct communication with your designer. Seamlessly collaborate and track progress while bringing your vision to life. {index + 1}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
