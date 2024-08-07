import React, { useEffect, useRef } from 'react';
import {ReactTyped as Typed} from 'react-typed';
import gsap from 'gsap';
import rightimage from "../images/Bubblesrighthome.webp";
import leftimage from "../images/BubbleslefthomeScreen.webp";
import wave from "../images/wave.svg"
const HeroSection = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const textSectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      leftImageRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      rightImageRef.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      textSectionRef.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
   <div className='w-full pt-20 bg-[#F7F4EE]'>
    <div className="flex justify-center items-center lg:py-5  text-center  relative ">
      {/* Left Side Animated Photos */}
      <div className="xl:flex flex-col justify-center items-center flex-1 hidden " ref={leftImageRef}>
        <img src={rightimage} alt="left floating bubbles" />
      </div>

      {/* Middle Text Section */}
      <div className="flex-2 max-w-2xl pb-5" ref={textSectionRef}>
        <h1 className="lg:text-6xl text-4xl xl:pt-0 pt-10  font-serif mb-5 font-bold leading-tight">
          We create
          <Typed
            strings={[' Websites', ' Assets', ' Designs']}
            typeSpeed={100}
            backSpeed={60}
            loop
            className="pl-2 text-[#F55F42] font-bold"
          />
          <br />
          for Businesses that want results<span className="text-red-500">.</span>
        </h1>
        <p className="text-xl  text-black-600 pt-4 z-0">
          If you can imagine it, we can create it. We offer web development
          and design services through <span className="text-red-500 ">subscription-based plans </span> 
          and <span className="text-red-500">packages</span>.
        </p>
        <button className="relative mt-6 py-2 px-7 text-lg font-bold bg-red-500 text-white rounded-3xl overflow-hidden group">
  <span className="absolute inset-0 bg-gradient-to-r from-[#003b31] to-yellow-800 transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
  <span className="relative z-10">See our services</span>
</button>

      </div>

      {/* Right Side Animated Photos */}
      <div className="xl:flex flex-col justify-center items-center flex-1 hidden" ref={rightImageRef}>
        <img src={leftimage} alt="right floating bubbles" />
      </div>
      <img src={wave} alt="wave img" className='object-cover xl:hidden absolute bottom-0 w-full -z-10' /> {/* Show only below xl screens */}

    </div>

   </div>
  );
};

export default HeroSection;