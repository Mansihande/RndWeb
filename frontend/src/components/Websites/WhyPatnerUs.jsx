import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WhyPartnerWithUs = () => {
  const [webSolutionData, setWebSolutionData] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/content/type/whyPartnerus', { withCredentials: true });
        const data = response.data[0];
        setWebSolutionData(data);
        if (data.video) {
          setVideoUrl(`/api/image/download/${data.video}`);
        }
      } catch (error) {
        console.error('Error fetching web solution data:', error);
      }
    };

    fetchData();
  }, []);

  if (!webSolutionData) {
    return <div>Loading...</div>;
  }

  return (
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
          <h2
            className="sm:text-5xl text-3xl font-semibold mb-4 font-playfair"
            dangerouslySetInnerHTML={{ __html: webSolutionData.heading }}
          />
          <p className="sm:text-xl text-base mb-4 font-inter pt-8" dangerouslySetInnerHTML={{ __html: webSolutionData.description }} />
        </div>
        <div className="md:w-[40%] flex justify-center">
          <img
            src={`/api/image/download/${webSolutionData.photo[0]}`}
            alt={webSolutionData.photoAlt}
            className="w-40 h-40 mt-6 md:mt-0 hidden md:block"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-6 text-white mx-4 sm:mx-10 md:mx-16 lg:mx-20">
        {webSolutionData.subsections.map((subsection, index) => (
          <div key={index} className="flex items-start">
            <img src={`/api/image/download/${subsection.photo}`} alt={subsection.photoAlt} className="sm:text-3xl text-xl h-10 w-10 mr-4" />
            <div className="flex flex-col">
              <h3 className="sm:text-2xl text-xl pb-1 font-bold font-inter">{subsection.title}</h3>
              <p className="md:text-left sm:text-lg text-base" dangerouslySetInnerHTML={{ __html: subsection.description }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPartnerWithUs;
