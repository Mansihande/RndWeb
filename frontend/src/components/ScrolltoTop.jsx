import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const topElementRef = useRef(null);
  const progressRef = useRef(null);

  // Handle Scroll-To-Top Button Visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(!entry.isIntersecting); // Show button when the top element is not in view
      },
      { threshold: 0.1 }
    );

    if (topElementRef.current) {
      observer.observe(topElementRef.current);
    }

    return () => {
      if (topElementRef.current) {
        observer.unobserve(topElementRef.current);
      }
    };
  }, []);

  // Handle Progress Bar Animation
  useEffect(() => {
    let progressTrigger;
    if (progressRef.current) {
      progressTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom 30%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          gsap.to(progressRef.current, { height: `${progress}%`, duration: 0.1 });
        },
      });
    }

    return () => {
      if (progressTrigger) {
        progressTrigger.kill();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center">
      <div ref={topElementRef}></div> {/* Element to observe */}
     
      {/* Scroll Progress Bar */}
      <div className="fixed left-24 bottom-20 h-12 w-0.5 bg-gray-300">
        <div
          ref={progressRef}
          className="bg-[#333] w-full h-0" // Progress bar
        ></div>
      </div>

      {/* Scroll-to-Top Button */}
      {isButtonVisible && (
        <div className="fixed bottom-40 left-10  gap-3">
          <button
            onClick={scrollToTop}
            className="text-gray-700 p-3 rotate-90 font-bold text-md "
          >
            Scroll to top
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
