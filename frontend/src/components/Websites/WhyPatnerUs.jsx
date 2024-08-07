import React from 'react';

const details = [
  {
    title: 'Customer Success',
    description: 'Ensuring our customers achieve their desired outcomes while using our products.',
    emoji: '✅'
  },
  {
    title: 'User-Centered Design',
    description: 'We craft user-centric designs that prioritize your target audience\'s needs, resulting in intuitive and engaging digital experiences.',
    emoji: '?'
  },
  {
    title: 'Lasting Impressions',
    description: 'We\'ll develop a distinctive brand identity that sets you apart, leaving a lasting impression on your target market.',
    emoji: '?'
  },
  {
    title: 'Customer Success',
    description: 'Ensuring our customers achieve their desired outcomes while using our products.',
    emoji: '✅'
  },
  {
    title: 'User-Centered Design',
    description: 'We craft user-centric designs that prioritize your target audience\'s needs, resulting in intuitive and engaging digital experiences.',
    emoji: '?'
  },
  {
    title: 'Lasting Impressions',
    description: 'We\'ll develop a distinctive brand identity that sets you apart, leaving a lasting impression on your target market.',
    emoji: '?'
  }
];

const WhyPartnerWithUs = () => (
  <section className="relative bg-[#114038] overflow-hidden py-8">
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

    <div className="flex flex-col md:flex-row justify-between items-start p-6 mt-28 mx-4 sm:mx-10 md:mx-16 lg:mx-20 text-white">
      <div className="md:w-[60%] ">
        <h2 className="sm:text-5xl text-3xl font-semibold mb-4 font-playfair">Why partner with us</h2>
        <p className="sm:text-xl text-base mb-4 font-inter pt-8">
          We specialize in providing the tools and strategies that give our clients a competitive advantage. Our WordPress packages are a fusion of cost-efficiency and simplicity, enabling you to launch an exquisite website without the technical complexity.
        </p>
      </div>
      <div className="md:w-[40%] flex justify-center">
        <img
          src="https://kolmdesign.com/wp-content/uploads/2023/08/kody-creative.svg"
          alt="Creative SVG"
          className="w-40 h-40 mt-6 md:mt-0 hidden md:block"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-6 text-white mx-4 sm:mx-10 md:mx-16 lg:mx-20">
      {details.map((detail, index) => (
        <div key={index} className="flex items-start">
          <span className="sm:text-3xl text-2xl mr-4">{detail.emoji}</span>
          <div className="flex flex-col">
            <h3 className="sm:text-2xl text-xl font-bold font-inter">{detail.title}</h3>
            <p className="md:text-left sm:text-lg text-base " >{detail.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default WhyPartnerWithUs;