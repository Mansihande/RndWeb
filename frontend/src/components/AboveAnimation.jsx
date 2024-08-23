import React from 'react';

const MainContent = () => {
  return (
    <main className="relative bg-white overflow-hidden">
      {/* SVG Background */}
      <div className="absolute top-0 left-0 right-0 w-full h-32 sm:h-48">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#F7F4EE"
            fillOpacity="1"
            d="M0,224L60,202.7C120,181,240,139,360,122.7C480,107,600,117,720,138.7C840,160,960,192,1080,202.7C1200,213,1320,203,1380,197.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      
      {/* Content Container */}
      <div className='bg-[#F7F4EE]'>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10 mt-24 sm:mt-36 md:mt-48 text-center relative bg-[#F7F4EE] pb-14">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Discover a more <span className="text-[#f3ca0d]">efficient design solution</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mx-8 text-justify">
          Our subscription model offers a sustainable solution for businesses to regularly update
          design assets and meet market expectations. Our approach maximizes design efficiency and
          reliability, blending high-quality creativity with productivity in a tech-driven era.
        </p>
      </div>
      </div>
    
    </main>
  );
};

export default MainContent;
