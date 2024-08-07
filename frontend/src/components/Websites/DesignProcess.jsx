import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DesignProcess1 from "../../images/DesignProcess/DesignProcess1.webp";
import DesignProcess2 from "../../images/DesignProcess/DesignProcess2.webp";
import DesignProcess3 from "../../images/DesignProcess/DesignProcess3.webp";
import DesignProcess4 from "../../images/DesignProcess/DesignProcess4.webp";
import DesignProcess5 from "../../images/DesignProcess/DesignProcess5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function DesignProcess() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const teamMembers = containerRef.current.querySelectorAll('.team-members');

      teamMembers.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0.5, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%", // Use fixed values for testing
              end: "bottom 20%",
              scrub: true,
              markers: {
                startColor: "green",
                endColor: "red",
                fontSize: "12px",
               
              },
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="relative" ref={containerRef}>
        <div className="flex flex-col mb-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">Our Design Process</h2>
          <p className="text-lg md:text-xl text-gray-700 mx-auto max-w-3xl">
            You can expect a collaborative process that will combine multiple services to elevate your brand, story, user experience, and overall customer success.
          </p>
        </div>
        <div className="relative">
          <div className="flex flex-col p-6 mt-4 mx-auto max-w-7xl">
            <div className="flex flex-col gap-10">
              {[DesignProcess1, DesignProcess2, DesignProcess3, DesignProcess4, DesignProcess5].map((imgSrc, index) => (
                <div
                  key={index}
                  className="team-members border border-lg border-black rounded-xl p-6 flex flex-col md:flex-row items-center space-x-0 md:space-x-6 bg-white shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
                >
                  <img src={imgSrc} alt={`Design Process ${index + 1}`} className="w-full h-52 md:w-52 md:h-52 rounded-md object-cover mb-4 md:mb-0" />
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
      </div>
    </div>
  );
}



