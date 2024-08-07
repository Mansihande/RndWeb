import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import FastDilivery from "../../images/WhatWeGive/FastDilivery.gif";
import Scalable from "../../images/WhatWeGive/Scalable.gif";
import LatestTrends from "../../images/WhatWeGive/latestTrends.gif";
import TopDesign from "../../images/WhatWeGive/TopDesign.gif";

const ExpertiseComponent = () => {
  const [counters, setCounters] = useState([
    { number: 563, title: "Assets delivered", image: LatestTrends },
    { number: 48, title: "Turnaround time", image: FastDilivery },
    { number: 50, title: "Finished websites", image: Scalable },
    { number: 5, title: "years driving growth", image: TopDesign }
  ]);
  const [isCountingStarted, setIsCountingStarted] = useState(false);

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

  return (
    <div id="expertiseComponent" className="flex flex-col items-center bg-gray-50 p-4 md:p-8">
      <h2 className="text-3xl md:text-5xl pb-10 font-serif">Driving growth for our clients</h2>
      <div className="flex flex-wrap justify-around w-full">
        {counters.map((counter, index) => (
          <div key={index} className="flex flex-col items-center mb-6 md:mb-0 w-1/2 md:w-1/4 p-4">
            <img src={counter.image} alt={counter.title} className="w-20 h-20 md:w-28 md:h-28 mb-4" />
            <CountUp start={isCountingStarted ? 0 : null} end={counter.number} duration={3}>
              {({ countUpRef }) => (
                <div className="text-2xl md:text-4xl font-bold text-gray-800" ref={countUpRef} />
              )}
            </CountUp>
            <div className="text-gray-600 text-center">{counter.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseComponent;
