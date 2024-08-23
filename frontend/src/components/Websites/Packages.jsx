import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdFunnel } from "react-icons/io";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const PricingSection = () => {
  const [selectedPages, setSelectedPages] = useState("1-5 pages");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [service, setService] = useState({});
  const location = useLocation();
  const [heading,setHeading]=useState("")
  const [subHeading,setSubheading]=useState("")
useEffect(()=>{  const fetchHeadings = async () => {
    try {
      const response = await axios.get('/api/pageHeading/heading?pageType=package', { withCredentials: true });
      const { heading, subheading } = response.data;
      setHeading(heading || '');
      setSubheading(subheading || '');
    } catch (error) {
      console.error(error);
    }
  };
  fetchHeadings()
},[])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const response = await axios.get(`/api/packages/front/${slug}`, { withCredentials: true });
        console.log("API Response:", response.data);

        // Normalize keys to match pageOptions
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

  // Ensure keys are consistent with the API data
  const pageOptions = Object.keys(service);

  const filteredItems = service[selectedPages] || [];
  console.log("Filtered Items:", filteredItems);

  // Helper function to parse JSON strings to arrays
  const parseJsonArray = (jsonArray) => {
    try {
      return JSON.parse(jsonArray);
    } catch {
      return [];
    }
  };

  return (
    <div className="mt-20">
<div className="text-center p-6 rounded-lg shadow-md">
  <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-800 mb-4">{heading}</h2>
  <p className="text-lg md:text-2xl px-4 md:px-20 text-gray-600">{subHeading}</p>
</div>


   <div className="flex flex-col items-center justify-center relative bg-white overflow-hidden">
      {/* Mobile Filter Button */}
      <button
        className="sm:hidden mt-20 mx-0 w-auto flex items-center justify-start px-4 py-2 text-lg font-inter focus:outline-none bg-[#F55F42] text-white rounded-lg"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        aria-label="Toggle filter"
      >
        <IoMdFunnel className="mr-2" />
        Filter
      </button>

      {/* Page Filter Section */}
      <div className="mt-10 sm:mt-20 w-full px-6 sm:w-3/4  ">
        <div className="sm:flex flex-wrap justify-center  gap-4 mb-6 hidden">
          {pageOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedPages(option)}
              className={`px-4 py-2 text-lg font-inter focus:outline-none ${
                selectedPages === option
                  ? "bg-black text-white rounded-lg"
                  : "text-gray-800 border border-gray-300 rounded-lg"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {isFilterOpen && (
          <div className="sm:hidden fixed inset-0 bg-white z-50 p-4">
            <button
              className="absolute top-4 right-4 text-gray-800 text-3xl"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filter"
            >
              <IoMdClose />
            </button>
            <div className="flex flex-col  space-y-4 mt-10">
              {pageOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedPages(option);
                    setIsFilterOpen(false);
                  }}
                  className={`px-4 py-2 text-lg font-inter focus:outline-none ${
                    selectedPages === option
                      ? "bg-black text-white rounded-lg"
                      : "text-gray-800 border border-gray-300 rounded-lg"
                  }`}
                >
                  {option}
                </button>
              ))}
              <button
                className="px-4 py-2 text-lg font-inter mt-4 bg-black text-white rounded-lg"
                onClick={() => setIsFilterOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Details Section */}
      <div className="mt-10 sm:mt-20 mb-10 w-full px-6 sm:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const whatYouGet = parseJsonArray(item.whatYouGet[0]);
              const whatIsTheir = parseJsonArray(item.whatIsTheir[0]);
              const whatIsNotTheir = parseJsonArray(item.whatIsNotTheir[0]);

              return (
                <div key={item._id} className="bg-[#F7F4EE] border border-gray-300 shadow-lg rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <span dangerouslySetInnerHTML={{ __html: item.description }}/>
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
                          <li key={index} className=" flex items-center gap-1"><FaCheck className="text-green-600 text-md" />{detail}</li>
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
                          <li key={index} className=" flex items-center gap-1"><RxCross2 className="text-red-600 text-md" />{exclusion}</li>
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
            <p className="text-gray-600">No items available for the selected option.</p>
          )}
        </div>
      </div>
    </div>
    </div>
 
  );
};

export default PricingSection;
