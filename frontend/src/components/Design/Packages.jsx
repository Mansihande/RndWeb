import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PricingSection = () => {
  const [service, setService] = useState({});
  const location = useLocation();
  const [heading, setHeading] = useState("");
  const [subHeading, setSubheading] = useState("");

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const response = await axios.get('/api/pageHeading/heading?pageType=package', { withCredentials: true });
        const { heading, subheading } = response.data;
        setHeading(heading || '');
        setSubheading(subheading || '');
      } catch (error) {
        console.error(error);
      }
    };
    fetchHeadings();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const response = await axios.get(`/api/packages/front/${slug}`, { withCredentials: true });
        console.log("API Response:", response.data);

        const normalizedService = {};
        Object.keys(response.data.data.subcategories).forEach(key => {
          const normalizedKey = key.trim(); // Trim any extra spaces
          normalizedService[normalizedKey] = response.data.data.subcategories[key];
        });

        setService(normalizedService);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

  // Helper function to parse JSON strings to arrays
  const parseJsonArray = (jsonArray) => {
    try {
      return JSON.parse(jsonArray);
    } catch {
      return [];
    }
  };

  const allItems = Object.values(service).flat();

  return (
    <div className="mt-20">
      <div className="text-center p-6 rounded-lg shadow-md">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-4">{heading}</h2>
        <p className="text-lg md:text-2xl px-4 md:px-20 text-gray-600">{subHeading}</p>
      </div>

      {/* Pricing Details Section */}
      <div className="mt-10 sm:mt-20 mb-10 w-full px-6 sm:w-3/4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {allItems.length > 0 ? (
            allItems.map((item) => {
              const whatYouGet = parseJsonArray(item.whatYouGet[0]);
              const whatIsTheir = parseJsonArray(item.whatIsTheir[0]);
              const whatIsNotTheir = parseJsonArray(item.whatIsNotTheir[0]);

              return (
                <div key={item._id} className="bg-[#F7F4EE] border border-gray-300 shadow-lg rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <span dangerouslySetInnerHTML={{ __html: item.description }} />
                  <p className="text-4xl text-black font-bold pb-2">${item.price}</p>
                  <button className="mt-2 w-full px-4 py-2 bg-[#F55F42] text-white rounded-lg text-sm sm:text-base">
                    Get Started
                  </button>
                  <div className="mb-2 pt-3">
                    <strong>What you get with {item.title}</strong>
                    <ul className="mt-2 mb-4 text-md text-black">
                      {whatYouGet.length ? (
                        whatYouGet.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))
                      ) : (
                        <li>No details available</li>
                      )}
                    </ul>
                  </div>
                  <div className="mt-2 mb-4 text-md text-gray-600">
                    <ul className="list-disc list-inside">
                      {whatIsTheir.length ? (
                        whatIsTheir.map((detail, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <FaCheck className="text-green-600 text-md" />{detail}
                          </li>
                        ))
                      ) : (
                        <li>No details available</li>
                      )}
                    </ul>
                  </div>
                  <div className="mb-2">
                    <ul className="mt-2 mb-4 text-md text-gray-600">
                      {whatIsNotTheir.length ? (
                        whatIsNotTheir.map((exclusion, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <RxCross2 className="text-red-600 text-md" />{exclusion}
                          </li>
                        ))
                      ) : (
                        <li>No exclusions listed</li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">No items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
