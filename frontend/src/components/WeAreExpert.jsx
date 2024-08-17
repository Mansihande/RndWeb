import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeAreExpert() {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/api/content/type/weareexpertsin`, { withCredentials: true });
        const expertData = response.data;

        if (expertData.length > 0) {
          const subsections = expertData[0].subsections;

          // Fetch images for each expert
          const expertsWithImages = await Promise.all(
            subsections.map(async (expert) => {
              try {
                const imageResponse = await axios.get(
                  `http://localhost:3006/api/image/download/${expert.photo}`,
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

          setExperts(expertsWithImages);
        }
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchExperts();
  }, []);

  return (
    <div>
      <h2 className="md:text-5xl text-3xl font-bold font-serif text-center my-24">We are experts in</h2>
      <div className="flex flex-wrap justify-center gap-10 my-8 mx-10">
        {experts.map((expert, index) => (
          <div key={index} className="flex flex-col items-center">
            {expert.imageUrl ? (
              <img src={expert.imageUrl} alt={expert.photoAlt} className="md:w-28 md:h-28 transition-transform transform hover:scale-105" />
            ) : (
              <div className="md:w-28 md:h-28 flex items-center justify-center bg-gray-200">
                <p>Image not available</p>
              </div>
            )}
            <p className="mt-2 text-xl font-medium">{expert.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
