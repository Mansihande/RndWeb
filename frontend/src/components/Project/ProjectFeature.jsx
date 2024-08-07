import React from 'react';
import Marquee from './Marquee';

const ProjectFeatures = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-[#F7F4EE] pt-40">
      <div className="text-center mx-10 md:mx-35%">
        <h1 className="text-4xl font-bold text-gray-900 md:text-7xl font-serif">Projects</h1>
        <p className="mt-10 text-lg text-gray-900 font-inter">
          We are your dedicated dream team partners, committed to making your business shine.
        </p>
        <button className="px-11 py-3 mt-5 text-white bg-[#F55F42] rounded-full hover:opacity-100 hover:text-black focus:outline-none transition duration-300 ease-in-out">
          Get Started
        </button>
        <p className="mt-12 text-lg text-[#114038] font-inter font-medium">
          Designs commonly featured by
        </p>
      </div>
      <div className="w-full mt-8">
        <Marquee />
      </div>
    </div>
  );
};

export default ProjectFeatures;
