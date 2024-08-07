import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import video1 from "../images/videos/ChooseSubscriptionsf.mp4";
import video2 from "../images/videos/FastOnBoarding.mp4";
import video3 from "../images/videos/KolmPlatform.mp4";
import video4 from "../images/videos/TrelloBoardSize.mp4";
import SvgImage1 from "../images/FlyingKody.webp";
import SvgImage2 from "../images/ProductiveKody.webp";
import SvgImage3 from "../images/BusyKody.webp";
import SvgImage4 from "../images/BusyKody.webp";

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {
  const descriptionRefs = useRef([]);
  const videoRefs = useRef([]);
  const svgRefs = useRef([]);


  const setVideoStyles = () => {
    const videos = videoRefs.current;
  
    videos.forEach((video) => {
      const screenWidth = window.innerWidth;
  
      let width, height;
      if (screenWidth < 768) { // Mobile
        width = "0%";
        height = "0%";
      } else if (screenWidth < 1024) { // Tablet
        width = "50%";
        height = "50%";
      } else { // Desktop
        width = "25%";
        height = "50%";
      }
  
      gsap.set(video, {
        position: "fixed",
        top: "45%",
        right: "10%",
        width,
        height,
        zIndex: 10,
        objectFit: "cover",
        opacity: 0, // Keep opacity zero initially
      });
    });
  };
  

  useEffect(() => {
    const descriptions = descriptionRefs.current;
    const videos = videoRefs.current;
    const svgs = svgRefs.current;
  
    if (descriptions.length === 4 && videos.length === 4 && svgs.length === 4) {
      videos.forEach((video) => video.pause());
  
      descriptions.forEach((desc, index) => {
        // ScrollTrigger for video playback
        ScrollTrigger.create({
          trigger: desc,
          start: "top center", // Adjusted to play video when the description top hits the center of the viewport
          end: () => `+=${desc.scrollHeight}`,
          pinSpacing: false,
          scrub: true,
          onEnter: () => playVideo(index, videos),
          onEnterSvg: () => showImages(index, svgs[index]),
          onLeave: () => pauseVideo(index, videos),
          onEnterBack: () => playVideo(index, videos),
          onLeaveBack: () => pauseVideo(index, videos),
          // markers: true,
        });
  
        // ScrollTrigger for SVG animation
        ScrollTrigger.create({
          trigger: desc,
          start: "center center", // Trigger when the middle of the description reaches the center of the viewport
          end: () => `+=${desc.scrollHeight}`,
          pinSpacing: false,
          scrub: true,
          onEnter: () => animateSvg(index, svgs[index]),
          onEnterBack: () => animateSvg(index, svgs[index]),
          // markers: true,
        });
      });
  
      setVideoStyles(); // Set initial video styles
  
      window.addEventListener('resize', setVideoStyles); // Adjust video styles on window resize
  
      svgs.forEach((svg, index) => {
        gsap.set(svg, {
          opacity: 1,
          scale: 0,
          position: "fixed",
          top: "50%",
          right: "10%",
          width: "20%",
          height: "40%",
          zIndex: 10,
        });
      });
    } else {
      console.error("Description, video, or SVG elements not found.");
    }
  
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('resize', setVideoStyles); // Clean up event listener
    };
  }, []);
  

  const playVideo = (index, videos) => {
    videos.forEach((video, i) => {
      if (i === index) {
        video
          .play()
          .catch((error) =>
            console.log(`Play error for video ${i + 1}:`, error)
          );
        gsap.to(video, { opacity: 1, duration: 0.5 }); // Fade in the video
      } else {
        video.pause();
        gsap.set(video, { opacity: 0 }); // Fade out other videos
      }
    });
  };

  const showImages = (index, svg) => {
    svg.forEach((video, i) => {
      if (i === index) {
        gsap.to(svg, { opacity: 1, duration: 0.5 }); // Fade in the video
      } else {
        video.pause();
        gsap.set(video, { opacity: 0 }); // Fade out other videos
      }
    });
  };

  const pauseVideo = (index, videos) => {
    videos[index].pause();
    gsap.to(videos[index], { opacity: 0, duration: 0.5 }); // Fade out the video
  };

  const animateSvg = (index, svg) => {
    gsap.set(svg, { opacity: 0, scale: 1 }); // Ensure it's hidden initially

    // Kill any existing ScrollTrigger associated with the svg
    const existingTrigger = ScrollTrigger.getById(`svg-animation-${index}`); // Use a unique ID for each SVG animation
    if (existingTrigger) {
      existingTrigger.kill();
    }

    // Create a new ScrollTrigger for the SVG
    ScrollTrigger.create({
      id: `svg-animation-${index}`, // Unique ID for the trigger
      trigger: svg,
      start: "top 80%", // Start when the top of the SVG is at 80% of the viewport height
      end: "bottom 20%", // End when the bottom of the SVG is at 20% of the viewport height
      scrub: 1, // Smoothly animate with scroll
      animation: gsap.fromTo(
        svg,
        { opacity: 0, scale: 1, x: getXInitial(index), y: getYInitial(index) }, // Initial state
        {
          opacity: 1,
          x: getXFinal(index),
          y: getYFinal(index),
          scale: 1,
          duration: 1,
          toggleActions: "restart none none reverse",
          onComplete: () => {
            gsap.to(svg, { opacity: 0, duration: 0 }); // Fade out after the animation completes
          },
        }
      ),
      onLeave: () => {
        gsap.to(svg, { opacity: 0, duration: 0 }); // Fade out when leaving
      },
      onLeaveBack: () => {
        gsap.to(svg, { opacity: 0, duration: 0.5 }); // Fade out on reverse scroll
      },
      // markers: true, // Enable markers for debugging
    });
  };

  // Helper functions to return initial x and y values based on index
  const getXInitial = (index) => {
    switch (index) {
      case 0:
        return "200%";
      case 1:
        return "0%";
      case 2:
        return "200%";
      case 3:
        return "10%";
      default:
        return "0%";
    }
  };

  const getYInitial = (index) => {
    switch (index) {
      case 0:
        return "-20%";
      case 1:
        return "0%";
      case 2:
        return "5%";
      case 3:
        return "200%";
      default:
        return "0%";
    }
  };

  // Helper functions to return final x and y values based on index
  const getXFinal = (index) => {
    switch (index) {
      case 0:
        return "50%";
      case 1:
        return "200%";
      case 2:
        return "10%";
      case 3:
        return "200%";
      default:
        return "0%";
    }
  };

  const getYFinal = (index) => {
    switch (index) {
      case 0:
        return "10%";
      case 1:
        return "5%";
      case 2:
        return "0%";
      case 3:
        return "-200%";
      default:
        return "0%";
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row bg-[#F7F4EE] pb-40">
  <div className="flex-1 p-4 box-border">
    <div className="text-gray-700">
      <div
        ref={(el) => (descriptionRefs.current[0] = el)}
        className="description mb-1 pl-6 lg:pl-32"
      >
        <h2 className="text-lg text-orange-400 pb-6">
          The flexibility you need
        </h2>
        <h3 className="text-3xl lg:text-5xl font-bold pb-6">
          Choose a subscription plan or package
        </h3>
        <p className="text-lg lg:text-2xl pb-6">
          Our subscription plans offer the flexibility you need to scale your
          business at your own pace. Whether you're looking for a monthly or
          annual subscription, we've got you covered with a variety of options
          to suit your business needs. We also offer website packages.
        </p>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🖥️
            </span>
            <p className="text-lg lg:text-2xl"> Websites</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🎨
            </span>
            <p className="text-lg lg:text-2xl"> Design</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              👍
            </span>
            <p className="text-lg lg:text-2xl"> Social Media</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              ⚙️
            </span>
            <p className="text-lg lg:text-2xl"> Website Management</p>
          </div>
        </div>
      </div>

      <div
        ref={(el) => (descriptionRefs.current[1] = el)}
        className="description mb-1 pl-6 lg:pl-32 pt-32 lg:pt-80"
      >
        <h2 className="text-lg text-orange-400 pb-6">
          The flexibility you need
        </h2>
        <h3 className="text-3xl lg:text-5xl font-bold pb-6">
          Choose a subscription plan or package
        </h3>
        <p className="text-lg lg:text-2xl pb-6">
          Our subscription plans offer the flexibility you need to scale your
          business at your own pace. Whether you're looking for a monthly or
          annual subscription, we've got you covered with a variety of options
          to suit your business needs. We also offer website packages.
        </p>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🖥️
            </span>
            <p className="text-lg lg:text-2xl"> Websites</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🎨
            </span>
            <p className="text-lg lg:text-2xl"> Design</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              👍
            </span>
            <p className="text-lg lg:text-2xl"> Social Media</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              ⚙️
            </span>
            <p className="text-lg lg:text-2xl"> Website Management</p>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-gray-400 rounded-xl py-6 px-5 gap-3 mt-12 text-lg lg:text-xl">
          <p>
            Our all-in-one solution is designed to simplify the creative process
            by offering a centralized platform. With our platform, you can
            manage requests, files, integrate with existing workflows, and
            communicate with your designers, all in one place.
          </p>
          <p>Olico, Co-founder & CEO at Kolm.</p>
        </div>
      </div>
      <div
        ref={(el) => (descriptionRefs.current[2] = el)}
        className="description mb-1 pl-6 lg:pl-32 pt-32 lg:pt-80"
      >
        <h2 className="text-lg text-orange-400 pb-6">
          The flexibility you need
        </h2>
        <h3 className="text-3xl lg:text-5xl font-bold pb-6">
          Choose a subscription plan or package
        </h3>
        <p className="text-lg lg:text-2xl pb-6">
          Our subscription plans offer the flexibility you need to scale your
          business at your own pace. Whether you're looking for a monthly or
          annual subscription, we've got you covered with a variety of options
          to suit your business needs. We also offer website packages.
        </p>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🖥️
            </span>
            <p className="text-lg lg:text-2xl"> Websites</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🎨
            </span>
            <p className="text-lg lg:text-2xl"> Design</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              👍
            </span>
            <p className="text-lg lg:text-2xl"> Social Media</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              ⚙️
            </span>
            <p className="text-lg lg:text-2xl"> Website Management</p>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-gray-400 rounded-xl py-6 px-5 gap-3 mt-12 text-lg lg:text-xl">
          <p>
            Our all-in-one solution is designed to simplify the creative process
            by offering a centralized platform. With our platform, you can
            manage requests, files, integrate with existing workflows, and
            communicate with your designers, all in one place.
          </p>
          <p>Olico, Co-founder & CEO at Kolm.</p>
        </div>
      </div>
      <div
        ref={(el) => (descriptionRefs.current[3] = el)}
        className="description mb-1 pl-6 lg:pl-32 pt-32 lg:pt-80"
      >
        <h2 className="text-lg text-orange-400 pb-6">
          The flexibility you need
        </h2>
        <h3 className="text-3xl lg:text-5xl font-bold pb-6">
          Choose a subscription plan or package
        </h3>
        <p className="text-lg lg:text-2xl pb-6">
          Our subscription plans offer the flexibility you need to scale your
          business at your own pace. Whether you're looking for a monthly or
          annual subscription, we've got you covered with a variety of options
          to suit your business needs. We also offer website packages.
        </p>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🖥️
            </span>
            <p className="text-lg lg:text-2xl"> Websites</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              🎨
            </span>
            <p className="text-lg lg:text-2xl"> Design</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              👍
            </span>
            <p className="text-lg lg:text-2xl"> Social Media</p>
          </div>
        </div>
        <div className="flex flex-col pb-3">
          <div className="flex items-center gap-3">
            <span className="bg-white px-2 py-2 rounded-full border border-red-400 shadow-lg">
              ⚙️
            </span>
            <p className="text-lg lg:text-2xl"> Website Management</p>
          </div>
        </div>
        <div className="flex flex-col bg-white border border-gray-400 rounded-xl py-6 px-5 gap-3 mt-12 text-lg lg:text-xl">
          <p>
            Our all-in-one solution is designed to simplify the creative process
            by offering a centralized platform. With our platform, you can
            manage requests, files, integrate with existing workflows, and
            communicate with your designers, all in one place.
          </p>
          <p>Olico, Co-founder & CEO at Kolm.</p>
        </div>
      </div>
    </div>
    </div>
    <div className="w-1/2 h-full relative bg-black flex justify-center items-center hidden lg:flex">
        {[video1, video2, video3, video4].map((videoSrc, index) => {
          const rotation = index % 2 === 0 ? "rotate(4deg)" : "rotate(-4deg)";
          return (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              src={videoSrc}
              muted
              loop
              className="w-full h-full object-cover rounded-lg"
              style={{
                transform: rotation,
                transformOrigin: "center",
                willChange: "transform",
              }}
            ></video>
          );
        })}
        {[SvgImage1, SvgImage2, SvgImage3, SvgImage4].map((svgSrc, index) => (
          <img
            key={index}
            ref={(el) => (svgRefs.current[index] = el)}
            src={svgSrc}
            alt={`SVG for video ${index + 1}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ width: "30%", pointerEvents: "none" }}
          />
        ))}
      </div>
    </div>
  );
}




export default ScrollSection;
