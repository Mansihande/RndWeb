import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import axios from 'axios';

const ExpertiseComponent = () => {
  const [heading, setHeading] = useState("");
  const [counters, setCounters] = useState([]);
  const [isCountingStarted, setIsCountingStarted] = useState(false);

  const fetchHeadings = async () => {
    try {
      const response = await axios.get('/api/pageHeading/heading?pageType=counter', { withCredentials: true });
      const { heading } = response.data;
      setHeading(heading || '');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const component = document.getElementById("expertiseComponent");
      if (component && !isCountingStarted) {
        const top = component.getBoundingClientRect().top;
        const viewHeight = window.innerHeight;
        if (top < viewHeight * 0.75) {
          setIsCountingStarted(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCountingStarted]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/counter/getCounter`, { withCredentials: true });
      const data = response.data;

      // Update the counters state with the fetched data
      const updatedCounters = data.map(item => ({
        number: item.no,
        title: item.title,
        sign:item.sign,
        image: `/api/logo/download/${item.photo}`, // Adjust the image path based on your setup
        alt:item.alt
      }));

      setCounters(updatedCounters);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="expertiseComponent" className="flex flex-col items-center bg-gray-50 p-4 md:p-8">
      <h2 className="text-3xl md:text-5xl pb-10 font-serif">{heading}</h2>
      <div className="flex flex-wrap justify-around w-full">
        {counters.map((counter, index) => (
          <div key={index} className="flex flex-col items-center mb-6 md:mb-0 w-1/2 md:w-1/4 p-4">
            <img src={counter.image} alt={counter.alt} className="w-20 h-20 md:w-28 md:h-28 mb-4" />
            <div className="flex  items-center">
            <CountUp start={isCountingStarted ? 0 : null} end={counter.number} duration={3}>
              {({ countUpRef }) => (
                <div className="text-2xl md:text-4xl font-bold text-gray-800" ref={countUpRef} />
              )}
            </CountUp><p className="text-2xl md:text-4xl font-bold text-gray-800">{counter.sign}</p>
            </div>
           
            <div className="text-gray-600 text-center">{counter.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseComponent;
