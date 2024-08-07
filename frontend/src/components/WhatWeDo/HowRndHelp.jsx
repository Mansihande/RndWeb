import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductiveKody from "../../images/ProductiveKody.webp";
import { FaCheckCircle } from "react-icons/fa";
import euro from "../../images/HowRnd/euro.webp";
import handeshake from "../../images/HowRnd/handshake.webp";
import hundredpoints from "../../images/HowRnd/hundredpoints.webp";
import palette from "../../images/HowRnd/palette.webp";
import rocket from "../../images/HowRnd/rocket.webp";
import thumbsup from "../../images/HowRnd/thumbsup.webp";

gsap.registerPlugin(ScrollTrigger);

export default function HowRndHelp() {
  const containerRef = useRef(null);
  const fadeInContainerRef = useRef(null); // New ref for the fade-in section

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".fade-in");

    // Apply GSAP animation to the new section
    const fadeInElements =
      fadeInContainerRef.current.querySelectorAll(".fade-in");
    fadeInElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0 }, // Start with scale 0
        {
          opacity: 1,
          y: 0, // Animate to final vertical position
          scale: 1, // Animate to final scale
          duration: 5, // Duration for a smoother transition
          ease: "power3.out", // Easing for a smoother animation
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Start animation when the element is in view
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative bg-[#114038] p-4 md:p-8">
      <div className="absolute inset-x-0 top-0">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            className="fill-current text-white"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
          />
        </svg>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col mx-4 2xl:mt-48 md:mx-20 lg:mx-40 md:flex-row items-center mt-12 md:mt-24 space-y-6 md:space-y-0 md:space-x-8"
      >
        <div className="flex flex-col items-center md:w-2/3 space-y-4 fade-in">
          <h2 className="text-2xl md:text-5xl text-white font-serif font-bold">
            How Kolm can help
          </h2>
          <p className="text-white text-lg md:text-xl">
            At Kolm, our design subscription model is crafted to help businesses
            scale efficiently and effectively. Here’s how our approach can
            support your growth.
          </p>
        </div>
        <div className="flex justify-center md:w-1/2 fade-in">
          <img
            src={ProductiveKody}
            alt="Productive Kody"
            className="w-32 h-32 md:w-52 md:h-52 max-w-sm md:max-w-md rounded-lg"
          />
        </div>
      </div>
      <div
        ref={fadeInContainerRef}
        className="flex flex-col mx-4 md:mx-20 lg:mx-32 space-y-6 mt-12 pb-20"
      >
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="fade-in bg-white text-gray-800 p-6 sm:mb-4 md:mb-0 md:p-12 rounded-3xl shadow-lg transition-transform duration-300">
            <img src={rocket} alt="rocket" className="h-12 w-12 mb-4" />
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              Cost-effective design solutions
            </h3>
            <div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Professional design team
                  </span>
                </div>
                <span className="pl-6">
                  Gain access to a dedicated team of skilled designers.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Top-tier visuals
                  </span>
                </div>
                <span className="pl-6">
                  We consistently provide top-quality visuals with a fast
                  turnaround time of 24-48 hours, depending on complexity with
                  unlimited revisions.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Across all platforms
                  </span>
                </div>
                <span className="pl-6">
                  We prioritize maintaining a strong and cohesive brand identity
                  across all platforms.
                </span>
              </div>
            </div>
          </div>

          <div className="fade-in bg-white  text-gray-800 p-6 md:p-12 rounded-3xl shadow-lg transition-transform duration-300">
            <img src={thumbsup} alt="thumbsup" className="h-12 w-12 mb-4" />
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              Cost-effective design solutions
            </h3>
            <div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Professional design team
                  </span>
                </div>
                <span className="pl-6">
                  Gain access to a dedicated team of skilled designers.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Top-tier visuals
                  </span>
                </div>
                <span className="pl-6">
                  We consistently provide top-quality visuals with a fast
                  turnaround time of 24-48 hours, depending on complexity with
                  unlimited revisions.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Across all platforms
                  </span>
                </div>
                <span className="pl-6">
                  We prioritize maintaining a strong and cohesive brand identity
                  across all platforms.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="fade-in bg-white text-gray-800 p-6 md:p-12 rounded-3xl shadow-xl transition-transform duration-300">
            <img src={handeshake} alt="handeshake" className="h-12 w-12 mb-4" />
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              Cost-effective design solutions
            </h3>
            <div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Professional design team
                  </span>
                </div>
                <span className="pl-6">
                  Gain access to a dedicated team of skilled designers.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Top-tier visuals
                  </span>
                </div>
                <span className="pl-6">
                  We consistently provide top-quality visuals with a fast
                  turnaround time of 24-48 hours, depending on complexity with
                  unlimited revisions.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Across all platforms
                  </span>
                </div>
                <span className="pl-6">
                  We prioritize maintaining a strong and cohesive brand identity
                  across all platforms.
                </span>
              </div>
            </div>
          </div>

          <div className="fade-in bg-white text-gray-800 p-6 md:p-12 rounded-3xl shadow-lg transition-transform duration-300">
            <img src={hundredpoints} alt="hundredpoints" className="h-12 w-12 mb-4" />
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              Cost-effective design solutions
            </h3>
            <div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Professional design team
                  </span>
                </div>
                <span className="pl-6">
                  Gain access to a dedicated team of skilled designers.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Top-tier visuals
                  </span>
                </div>
                <span className="pl-6">
                  We consistently provide top-quality visuals with a fast
                  turnaround time of 24-48 hours, depending on complexity with
                  unlimited revisions.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Across all platforms
                  </span>
                </div>
                <span className="pl-6">
                  We prioritize maintaining a strong and cohesive brand identity
                  across all platforms.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="fade-in bg-white text-gray-800 p-6 md:p-12 rounded-3xl shadow-xl transition-transform duration-300">
            <img src={palette} alt="palette" className="h-12 w-12 mb-4" />
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              Cost-effective design solutions
            </h3>
            <div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Professional design team
                  </span>
                </div>
                <span className="pl-6">
                  Gain access to a dedicated team of skilled designers.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Top-tier visuals
                  </span>
                </div>
                <span className="pl-6">
                  We consistently provide top-quality visuals with a fast
                  turnaround time of 24-48 hours, depending on complexity with
                  unlimited revisions.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Across all platforms
                  </span>
                </div>
                <span className="pl-6">
                  We prioritize maintaining a strong and cohesive brand identity
                  across all platforms.
                </span>
              </div>
            </div>
          </div>

          <div className="fade-in bg-white text-gray-800 p-6 md:p-12 rounded-3xl shadow-lg transition-transform duration-300">
            <img src={euro} alt="euro" className="h-12 w-12 mb-4" />
            <h3 className="text-xl md:text-3xl font-bold mb-4">
              Cost-effective design solutions
            </h3>
            <div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Professional design team
                  </span>
                </div>
                <span className="pl-6">
                  Gain access to a dedicated team of skilled designers.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Top-tier visuals
                  </span>
                </div>
                <span className="pl-6">
                  We consistently provide top-quality visuals with a fast
                  turnaround time of 24-48 hours, depending on complexity with
                  unlimited revisions.
                </span>
              </div>
              <div className="flex flex-col gap-3 mb-2">
                <div className="flex items-center gap-2 justify-start">
                  <FaCheckCircle className="text-xl" />
                  <span className="text-lg md:text-xl font-bold">
                    Across all platforms
                  </span>
                </div>
                <span className="pl-6">
                  We prioritize maintaining a strong and cohesive brand identity
                  across all platforms.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            className="fill-current text-white"
            d="M421.9,93.5c22.6,2.5,51.5-0.4,75.5-5.3c23.6-4.9,70.9-23.5,100.5-35.7c75.8-32.2,133.7-44.5,192.6-49.7c23.6-2.1,48.7-3.5,103.4,2.5c54.7,6,106.2,25.6,106.2,25.6V100H0V69.7c0,0,72-32.6,158.4-30.5c39.2,0.7,92.8,6.7,134,22.4c21.2,8.1,52.2,18.2,79.7,24.2C399.3,92.1,411.6,92.5,421.9,93.5z"
          />
        </svg>
      </div>
    </div>
  );
}
