import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmallScreenTeamMembers from "./SmallScreen"; // Adjust the path as necessary

gsap.registerPlugin(ScrollTrigger);

const TeamMembers = () => {
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let animation;
    if (containerRef.current) {
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
  }, [isSmallScreen]);

  return (
    <div className="vertical-scroll-container pt-32 pb-16">
      {isSmallScreen ? (
        <SmallScreenTeamMembers />
      ) : (
        <>
          <div className="top-32 bg-white">
            <h2 className="text-5xl font-serif p-4 text-center">
              Challenges <span className="text-orange-500">Businesses Face</span>
            </h2>
          </div>
          <div className="relative" ref={containerRef}>
            <div
              id="team-members"
              className="flex whitespace-nowrap overflow-hidden gap-36 px-40 pt-20"
            >
              <div className="team-member flex-shrink-0 w-96 h-96 p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-b from-blue-400 to-indigo-50 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
                <h2 className="text-3xl font-bold mb-4 -translate-x-16 text-wrap pb-10">
                  Limited resources to meet design demand
                </h2>
                <p className="text-black translate-x-16 text-wrap mt-2">
                  Limited resources, including budget, time, and personnel, may hinder businesses’ ability to effectively manage design and digital assets in-house or through various channels.
                </p>
              </div>

              <div className="team-member flex-shrink-0 w-96 h-96 p-6 border border-gray-200 rounded-2xl bg-gradient-to-b from-green-800 to-green-50 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
                <h2 className="text-3xl font-bold mb-4 -translate-x-16 text-wrap pb-10">
                  Difficulty finding good design talent
                </h2>
                <p className="text-black translate-x-16 text-wrap mt-2">
                  Businesses face challenges in finding and retaining skilled design talent. The shortage of qualified designers may hinder their ability to fulfill design needs effectively.
                </p>
              </div>

              <div className="team-member flex-shrink-0 w-96 h-96 p-6 border border-gray-200 rounded-2xl bg-gradient-to-b from-orange-400 to-orange-50 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
                <h2 className="text-3xl font-bold mb-4 -translate-x-16 text-wrap pb-10">
                  Financial constraints for long-term agency commitment
                </h2>
                <p className="text-black translate-x-16 text-wrap mt-2">
                  Businesses often face financial challenges that prevent them from committing to long-term partnerships with design agencies. While recognizing the value of external design support, they may find it difficult to sustain financial commitments over an extended period.
                </p>
              </div>

              <div className="team-member flex-shrink-0 w-96 h-96 p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-b from-green-950 to-indigo-100 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
                <h2 className="text-3xl font-bold mb-4 -translate-x-16 text-wrap pb-10">
                  Time constraints
                </h2>
                <p className="text-black translate-x-16 text-wrap mt-2">
                  Managing design and digital assets can be time-consuming, diverting resources from core activities. Working with multiple freelancers or agencies for design and digital management can worsen time constraints, leading to communication issues and project delays.
                </p>
              </div>

              <div className="team-member flex-shrink-0 w-96 h-96 p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-b from-red-400 to-red-100 transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
                <h2 className="text-3xl font-bold mb-4 -translate-x-16 text-wrap pb-10">
                  Lack of expertise
                </h2>
                <p className="text-black translate-x-16 text-wrap mt-2">
                  The rapidly evolving digital landscape presents challenges in keeping up with emerging trends, technologies, and platforms. Business owners or internal teams may lack the expertise or specialized skills required to execute design and development tasks effectively, leading to mediocre results or inefficiencies.
                </p>
              </div>
              {/* Add more team members as needed */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamMembers;
