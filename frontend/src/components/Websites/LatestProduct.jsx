import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LatestProject1 from "../../images/LatestProject/LatestProject1.webp";
import LatestProject2 from "../../images/LatestProject/LatestProject2.webp";
import LatestProject3 from "../../images/LatestProject/LatestProject3.webp";
import LatestProject4 from "../../images/LatestProject/LatestProject4.webp";

gsap.registerPlugin(ScrollTrigger);

export default function LatestProduct() {
  const containerRef = useRef(null);

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
  }, []);

  return (
    <>
      <div className="bg-white mb-92 ">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif p-4  text-center">
          Latest <span className="text-orange-500">Projects</span>
        </h2>
      </div>
      <div className="relative" ref={containerRef}>
        <div
          id="team-members"
          className="flex whitespace-nowrap overflow-hidden gap-10 px-4 sm:px-8"
        >
          <div className="team-member flex-shrink-0 w-60 sm:w-80 md:w-96 h-auto  transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
            <img src={LatestProject1} alt="LatestProject1" className="object-cover rounded-3xl" />
          </div>

          <div className="team-member flex-shrink-0 w-60 sm:w-80 md:w-96 h-auto  transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
            <img src={LatestProject2} alt="LatestProject2" className="object-cover rounded-3xl" />
          </div>

          <div className="team-member flex-shrink-0 w-60 sm:w-80 md:w-96 h-auto transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
            <img src={LatestProject3} alt="LatestProject3" className="object-cover rounded-3xl" />
          </div>

          <div className="team-member flex-shrink-0 w-60 sm:w-80 md:w-96 h-auto  transition-transform duration-300 hover:shadow-xl hover:scale-105 relative">
            <img src={LatestProject4} alt="LatestProject4" className="object-cover rounded-3xl" />
          </div>
        </div>
      </div>
    </>
  );
}
