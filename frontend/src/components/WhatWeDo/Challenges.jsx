import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmallScreenTeamMembers from "./SmallScreen"; // Adjust the path as necessary
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const colors = [
  'bg-gradient-to-b from-blue-400 to-indigo-50',
  'bg-gradient-to-b from-green-800 to-green-50',
  'bg-gradient-to-b from-orange-400 to-orange-50',
  'bg-gradient-to-b from-red-400 to-red-100',
  'bg-gradient-to-b from-purple-400 to-purple-100',
];

const TeamMembers = () => {
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [challengesData, setChallenges] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`/api/content/type/challengesface`, { withCredentials: true });
        const challengesData = response.data;
        setChallenges(challengesData);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

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
    if (containerRef.current && dataLoaded && !isSmallScreen) {
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
  }, [isSmallScreen, dataLoaded, challengesData]);

  const renderHeading = (heading) => {
    return <div className="text-5xl font-serif p-4 text-center" dangerouslySetInnerHTML={{ __html: heading }} />;
  };

  return (
    <div className="vertical-scroll-container pt-32 pb-16">
      {isSmallScreen ? (
        <SmallScreenTeamMembers />
      ) : (
        <>
          <div className="top-32 bg-white">
            {renderHeading(challengesData[0]?.heading || "<h2>Loading...</h2>")}
          </div>
          <div className="relative" ref={containerRef}>
            <div
              id="team-members"
              className="flex whitespace-nowrap overflow-hidden gap-36 px-40 pt-20"
            >
              {challengesData[0]?.questions.map((challenge, index) => (
                <div
                  key={index}
                  className={`team-member flex-shrink-0 w-96 h-96 p-6 border border-gray-200 rounded-2xl shadow-lg
                    ${colors[index % colors.length]}
                    transition-transform duration-300 hover:shadow-xl hover:scale-105 relative`}
                >
                  <h2 className="text-3xl font-bold mb-4 -translate-x-16 text-wrap pb-10">
                    {challenge.question}
                  </h2>
                  <p
                    className="text-black translate-x-16 text-wrap mt-2"
                    dangerouslySetInnerHTML={{ __html: challenge.answer }}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamMembers;