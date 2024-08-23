import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WhatYouGet() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`/api/content/type/everyplan`, { withCredentials: true });
        const expertData = response.data;

        if (expertData.length > 0) {
          const subsections = expertData[0].subsections;

          // Fetch images for each expert
          const expertsWithImages = await Promise.all(
            subsections.map(async (expert) => {
              try {
                const imageResponse = await axios.get(
                  `/api/image/download/${expert.photo}`,
                  { responseType: 'blob' }
                );
                const imageUrl = URL.createObjectURL(imageResponse.data);
                return { ...expert, imageUrl };
              } catch (error) {
                console.error("Error fetching image:", error);
                return { ...expert, imageUrl: null };
              }
            })
          );

          setPlans(expertsWithImages);
        }
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchExperts();
  }, []);

  return (
    <div className="container mx-auto py-40 px-20">
      <div className="text-center mb-40">
        <h2 className="text-5xl font-serif font-bold">
          What you’ll get with <span className='text-[#f3ca0d]'>every plan.</span>
        </h2>
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <li key={index} className="flex flex-col items-center text-center">
              <img
                src={plan.imageUrl || 'path_to_default_image.jpg'}
                alt={plan.photoAlt}
                className="mb-6 lg:w-24 lg:h-24 w-28 h-28 object-contain"
              />
              <h3 className="text-xl font-semibold pb-3">{plan.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: plan.description }}></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

