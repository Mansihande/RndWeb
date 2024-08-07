import React from 'react';

export default function HeroSection() {
  return (
    <div className="bg-[#114038] flex flex-col items-center justify-center text-center pt-44 pb-16 p-6">
      <h2 className="text-white text-6xl md:text-4xl lg:text-7xl font-serif mb-7">
        What we do
      </h2>
      <p className="text-white text-lg md:text-xl lg:text-2xl mb-6">
        Unlimited design and website packages
      </p>
      <button className="relative mt-6 py-2 px-7 text-lg font-bold bg-red-500 text-white rounded-3xl overflow-hidden group">
  <span className="absolute inset-0 bg-gradient-to-r from-[#003b31] to-yellow-800 transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
  <span className="relative z-10">See our services</span>
</button>

    </div>
  );
}
