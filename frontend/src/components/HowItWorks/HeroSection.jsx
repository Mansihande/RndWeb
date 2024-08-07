import React from 'react';
import howItWorksData from '../../data/HowItWorks.json'; // Adjust the path as needed
import howitworks from '../../images/howitworks.svg';

const HowItWorks = () => {
  return (
    <>
      <section className="pt-32 bg-[#faf7f3]">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center">
            <div className="hidden md:block flex-shrink-0 w-1/6"></div> {/* Placeholder div */}
            <h2 className="text-5xl md:text-7xl font-serif font-bold flex-grow">
              {howItWorksData.title.split(' ').map((word, index) => (
                <span key={index} className={index === howItWorksData.title.split(' ').length - 1 ? 'text-[#f55f42]' : ''}>
                  {word}
                  {index !== howItWorksData.title.split(' ').length - 1 && ' '}
                </span>
              ))}
            </h2>
            <div className="hidden md:block flex-shrink-0 w-1/6">
              <img src={howitworks} alt="howitworks" className="h-40 w-40 md:h-72 md:w-72 ml-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Add white space between sections */}
      <div className="my-4"></div>

      <div className="container mx-auto text-center bg-[#faf7f3]">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {howItWorksData.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 mx-4 md:mx-10 p-2 w-full md:w-auto xl:flex-1">
              <div className="text-2xl bg-white border border-[#f55f42] rounded-full pl-4 pr-3 py-2 font-bold text-[#f55f42] mb-2">
                {step.number}
              </div>
              <div className="text-lg font-semibold">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
