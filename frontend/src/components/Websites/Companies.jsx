import React from 'react';
import f1 from '../../images/Website/msvg/c1.svg';
import f2 from '../../images/Website/msvg/c2.svg';
import f3 from '../../images/Website/msvg/c3.svg';
import f4 from '../../images/Website/msvg/c4.svg';
import f5 from '../../images/Website/msvg/c5.svg';

const Companies = () => {
  const svgs = [f1, f2, f3, f4, f5];

  return (
    <>
      <div className="py-6 px-4 mt-20">
        <h1 className="text-2xl md:text-3xl lg:text-3xl text-black font-medium text-center">
          Companies that use WordPress
        </h1>
      </div>
      <div className="py-6 mx-4 sm:mx-8 lg:mx-16 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {svgs.map((svg, index) => (
            <img
              key={index}
              src={svg}
              alt={`SVG ${index + 1}`}
              className="h-6 sm:h-8 lg:h-8 sm:mx-auto mx-2 hover:transition-transform hover:scale-110"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Companies;