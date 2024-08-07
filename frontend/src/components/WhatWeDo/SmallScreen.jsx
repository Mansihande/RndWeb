import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmallScreenTeamMembers = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".team-member");
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
              markers: true
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="top-32 bg-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif p-4 text-center">
          Challenges <span className="text-orange-500">Businesses Face</span>
        </h2>
      </div>
      <div id="team-members" className="flex flex-col p-6 mt-4">
        <div className="flex flex-col gap-10 px-4 md:px-20 lg:px-40 pt-20">
          <div className="team-member w-full h-auto p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-b from-blue-400 to-indigo-50 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited resources to meet design demand</h2>
            <p className="text-black mt-2">
              Limited resources, including budget, time, and personnel, may hinder businesses’ ability to effectively manage design and digital assets in-house or through various channels.
            </p>
          </div>

          <div className="team-member w-full h-auto p-6 border border-gray-200 rounded-2xl bg-gradient-to-b from-green-800 to-green-50 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Difficulty finding good design talent</h2>
            <p className="text-black mt-2">
              Businesses face challenges in finding and retaining skilled design talent. The shortage of qualified designers may hinder their ability to fulfill design needs effectively.
            </p>
          </div>

          <div className="team-member w-full h-auto p-6 border border-gray-200 rounded-2xl bg-gradient-to-b from-orange-400 to-orange-50 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Financial constraints for long-term agency commitment</h2>
            <p className="text-black mt-2">
              Businesses often face financial challenges that prevent them from committing to long-term partnerships with design agencies. While recognizing the value of external design support, they may find it difficult to sustain financial commitments over an extended period.
            </p>
          </div>

          <div className="team-member w-full h-auto p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-b from-green-950 to-indigo-100 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Time constraints</h2>
            <p className="text-black mt-2">
              Managing design and digital assets can be time-consuming, diverting resources from core activities. Working with multiple freelancers or agencies for design and digital management can worsen time constraints, leading to communication issues and project delays.
            </p>
          </div>

          <div className="team-member w-full h-auto p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-b from-red-400 to-red-100 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Lack of expertise</h2>
            <p className="text-black mt-2">
              The rapidly evolving digital landscape presents challenges in keeping up with emerging trends, technologies, and platforms. Business owners or internal teams may lack the expertise or specialized skills required to execute design and development tasks effectively, leading to mediocre results or inefficiencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenTeamMembers;
