import React, { useState, useEffect } from 'react';
import expertData from '../data/WeAreExpert.json';
import Figma from "../images/Figma.svg";
import Adobe from "../images/Adobe.svg";
import Elementor from "../images/Elementor.svg";
import Shopify from "../images/Shopify.svg";
import WebFlow from "../images/WebFlow.svg";
import WordPress from "../images/WordPress.svg";

const images = {
  Figma: Figma,
  Adobe: Adobe,
  Elementor: Elementor,
  Shopify: Shopify,
  WebFlow: WebFlow,
  WordPress: WordPress
};

export default function WeAreExpert() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    setExperts(expertData.experts);
  }, []);

  return (
    <div>
      <h2 className="md:text-5xl text-3xl font-bold font-serif text-center my-24 ">We are experts in</h2>
      <div className="flex flex-wrap justify-center gap-10 my-8 mx-10 ">
        {experts.map((expert, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={images[expert.name]} alt={expert.name} className="md:w-28 md:h-28  transition-transform transform hover:scale-105" />
            <p className="mt-2 text-xl font-medium">{expert.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
