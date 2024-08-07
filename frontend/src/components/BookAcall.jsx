import React from 'react';
import Bookacall from "../images/Bookacall.svg";
import data from '../data/Bookacall.json'; // Adjust the path as needed

export default function BookAcall() {
  return (
    <div className="relative bg-[#134C6C] text-white rounded-2xl py-10 px-6 lg:px-20 lg:flex flex-col lg:flex-row items-center justify-between mx-4 lg:mx-40 overflow-hidden">
      <div className="absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-[#155376] rounded-t-full"></div>
      
      <div className="lg:w-1/2 mb-6 lg:mb-0 relative z-0">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">{data.heading}</h2>
        <p className="mb-6 text-base lg:text-lg">
          {data.description}
        </p>
        <div className="flex flex-col md:flex-row">
          {data.buttons.map((button, index) => (
            <button
              key={index}
              className={`${
                button.type === 'primary'
                  ? 'bg-red-500 text-white py-2 px-6 rounded-lg mr-4 mb-4 lg:mb-0 font-bold'
                  : 'border-2 border-white text-white py-2 px-4 rounded-lg font-bold'
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
      
      {/* Hide this div below lg breakpoint */}
      <div className="lg:w-1/2 xl:flex justify-center xl:justify-end relative z-0 hidden lg:block">
        <img src={Bookacall} alt="Book a call" className="w-full h-auto max-w-[400px] mx-auto" />
      </div>
    </div>
  );
}
