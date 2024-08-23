import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PremiumTemplatesSection = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/content/type/premiumtemplates`, { withCredentials: true });
        const contentData = response.data;

        if (contentData.length > 0) {
          setContent(contentData[0]);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  if (!content) {
    return null; // or a loader/spinner component
  }

  return (
    <section className="relative bg-[#f9f7f1] text-black md:mx-40 mx-6 sm:h-auto rounded-lg shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full lg:w-1/2 p-4 sm:ml-10 sn:space-y-7">
          <div className="flex flex-col ">
            <h2 className="text-4xl font-semibold mb-4 font-inter" dangerouslySetInnerHTML={{ __html: content.heading }} />
            <p className="text-base mb-8 font-inter" dangerouslySetInnerHTML={{ __html: content.description }} />
            <div className="flex">
              <Link
                to="/templates"
                className="inline-block px-6 py-3 bg-[#f3ca0d] text-white font-semibold text-sm rounded-md hover:text-black transition duration-300"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 lg:h-1/3 hidden lg:flex items-end lg:justify-end">
          <img
            className="rounded-lg"
            src={`/api/image/download/${content.photo[0]}`}
            alt={content.photoAlt}
          />
        </div>
      </div>
    </section>
  );
};

export default PremiumTemplatesSection;
