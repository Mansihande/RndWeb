import React from 'react';
import template from '../images/template.webp';

const PremiumTemplatesSection = () => {
  return (
    <section className="relative bg-[#f9f7f1] text-black md:mx-40 mx-6 sm:h-auto rounded-lg shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full lg:w-1/2 p-4 sm:ml-10 sn:space-y-7">
          <div className="flex flex-col ">
            <h2 className="text-4xl font-semibold mb-4 font-inter">We also sell premium templates</h2>
            <p className="text-base mb-8 font-inter">
              Working with a limited budget but unwilling to compromise on design quality? Kolm proudly presents premium templates – accessible for everyone.
            </p>
            <div className="flex">
              <a
                href="https://kolmdesign.com/templates/"
                className="inline-block px-6 py-3 bg-[#F55F42] text-white font-semibold text-sm rounded-md hover:text-black transition duration-300"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 lg:h-1/3 hidden lg:flex items-end lg:justify-end">
          <img
            className="rounded-lg"
            src={template}
            alt="Premium Templates"
          />
        </div>
      </div>
    </section>
  );
};

export default PremiumTemplatesSection;