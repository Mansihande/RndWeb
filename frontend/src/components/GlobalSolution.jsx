import React from 'react';
import globalSolutionData from "../data/GlobalSolution.json"; // Adjust the path as needed

const GlobalSolution = () => {
  return (
    <section className="relative bg-[#114038] overflow-hidden">
      {/* Shape Divider */}
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

      {/* Content Section */}
      <div className="relative sm:pt-32 pt-24"> {/* Adjust padding-top to provide space for the SVG */}
        <div className="container mx-auto  py-12 sm:px-4 px-2 w-full sm:w-[67%]">
          <div className="text-center">
            <h2 className="sm:text-5xl  text-3xl font-semibold mb-4 font-serif text-white">
              {globalSolutionData.title} <span className="text-[#F55F42]">{globalSolutionData.highlight}</span>
            </h2>
            <p className="sm:text-lg text-base mb-8 text-white font-inter sm:pt-10 pt-7">
              {globalSolutionData.description}
            </p>
          </div>

          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:mt-32 mt-24">
            {globalSolutionData.languages.map((language, index) => (
              <div key={index} className="text-center space-y-6">
                <img
                  loading="lazy"
                  decoding="async"
                  src={language.imgSrc}
                  alt={language.alt}
                  className="md:w-28 md:h-28 w-24 h-24 mx-auto mb-2"
                />
                <h3 className="md:text-xl text-md text-base font-semibold font-inter text-white">{language.name}</h3>
              </div>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default GlobalSolution;
