import React, { useState } from "react";
import { IoMdClose, IoMdFunnel } from "react-icons/io";
import pricingDatas from "../../data/pricingdata.json";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const templates = [
  { id: 1, title: "Websites", content: "Website development services." },
  { id: 2, title: "Design", content: "Graphic and UI design services." },
  { id: 3, title: "E-commerce", content: "E-commerce design services." },
  { id: 4, title: "Social Media", content: "Websites Management services." },
  { id: 5, title: "Websites Management", content: "Websites Management design services." },
];

const PricingSection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedPages, setSelectedPages] = useState("1-4");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleItemClick = (template) => {
    if (selectedTemplate.id === template.id) return;
    setSelectedTemplate(template);
    setIsFilterOpen(false);
  };

  const pageOptions = ["1-4", "5-9", "10-15", "16-25"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-white overflow-hidden">
      <button
        className="sm:hidden mt-20 mx-0 w-auto flex items-center justify-start px-4 py-2 text-lg font-inter focus:outline-none bg-[#F55F42] text-white rounded-lg"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
      >
        <IoMdFunnel className="mr-2" />
        Filter
      </button>

      <div className="hidden sm:flex space-x-8 mt-20">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleItemClick(template)}
            className={`px-4 py-2 text-base sm:text-lg md:text-xl lg:text-2xl font-inter focus:outline-none ${
              selectedTemplate.id === template.id
                ? "bg-[#F55F42] text-white rounded-lg"
                : "text-gray-800 border-transparent"
            }`}
          >
            {template.title}
          </button>
        ))}
      </div>

      {isFilterOpen && (
        <div className="sm:hidden fixed h-auto inset-0 bg-white z-50 p-4">
          <button
            className="absolute top-4 right-4 text-gray-800 text-3xl"
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filter"
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col space-y-4 mt-10">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleItemClick(template)}
                className={`px-4 py-2 text-lg font-inter focus:outline-none ${
                  selectedTemplate.id === template.id
                    ? "bg-[#F55F42] text-white rounded-lg"
                    : "text-gray-800 border-transparent"
                }`}
              >
                {template.title}
              </button>
            ))}
            <button
              className="px-4 py-2 text-lg font-inter mt-4 bg-[#F55F42] text-white rounded-lg"
              onClick={() => setIsFilterOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedTemplate.title === "Websites" && (
        <div className="mt-6">
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
            {pageOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedPages(option)}
                className={`px-4 py-2 border rounded-lg text-sm sm:text-base ${
                  selectedPages === option ? "bg-[#F55F42] text-white" : "bg-white text-gray-800"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 sm:mt-20 mb-10 w-full px-6 sm:w-3/4">
        <div className="flex flex-row-3 flex-wrap justify-center lg:justify-start">
          {pricingDatas[selectedTemplate.title] ? (
            selectedTemplate.title === "Websites" ? (
              pricingDatas[selectedTemplate.title][0][selectedTemplate.title][selectedPages] ? (
                Object.entries(pricingDatas[selectedTemplate.title][0][selectedTemplate.title][selectedPages]).map(
                  ([planName, plan]) => (
                    <div key={planName} className="flex flex-col items-start p-4 border rounded-lg shadow m-2 w-full sm:w-1/2 lg:w-1/3">
                      <span className="text-lg md:text-xl font-semibold text-gray-800">{planName}</span>
                      <span className="text-2xl text-black font-bold">{plan.price}</span>
                      <button className="mt-2 px-4 py-2 bg-[#F55F42] text-white rounded-lg text-sm sm:text-base">
                        Get Started
                      </button>
                      <h3 className="font-bold pt-3">What you'll get with {planName}</h3>
                      <ul className="mt-2 mb-4 text-md text-black">
                        {plan.getWithMaintanance.map((detail, index) => (
                          <li key={index} className="ml-5">{detail}</li>
                        ))}
                      </ul>
                      <ul className="mt-2 mb-4 text-md text-gray-600">
                        {plan.details.map((detail, index) => (
                          <li key={index} className="ml-5 flex items-center gap-1">
                            <FaCheck className="text-green-600 text-md" />{detail}
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-2 mb-4 text-md text-gray-600">
                        {plan.donoget.map((detail, index) => (
                          <li key={index} className="ml-5 flex items-center gap-1">
                            <RxCross2 className="text-red-600 text-md" />{detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )
              ) : (
                <div>No pricing plans available for this page selection.</div>
              )
            ) : (
              pricingDatas[selectedTemplate.title].map((plan) => (
                <div key={plan.plan} className="flex flex-col items-start p-4 border rounded-lg shadow m-2 w-full sm:w-1/2 lg:w-1/3">
                  <span className="text-lg md:text-xl font-semibold text-gray-800">{plan.plan}</span>
                  <span className="text-2xl text-black font-bold">{plan.price}</span>
                  <button className="mt-2 px-4 py-2 bg-[#F55F42] text-white rounded-lg text-sm sm:text-base">
                    Get Started
                  </button>
                  <h3 className="font-bold pt-3">What you'll get with {plan.plan}</h3>
                  <ul className="mt-2 mb-4 text-md text-black">
                    {plan.getWithMaintanance.map((detail, index) => (
                      <li key={index} className="ml-5">{detail}</li>
                    ))}
                  </ul>
                  <ul className="mt-2 mb-4 text-md text-gray-600">
                    {plan.details.map((detail, index) => (
                      <li key={index} className="ml-5 flex items-center gap-1">
                        <FaCheck className="text-green-600 text-md" />{detail}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-2 mb-4 text-md text-gray-600">
                    {plan.donoget.map((detail, index) => (
                      <li key={index} className="ml-5 flex items-center gap-1">
                        <RxCross2 className="text-red-600 text-md" />{detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )
          ) : (
            <div>No pricing plans available for this template.</div>
          )}
        </div>

        {/* Inquiry Section */}
        <div className="flex flex-col items-center mt-10 p-6 border-t border-gray-300">
          <h2 className="text-2xl font-bold">Need something more?</h2>
          <p className="mt-4 text-center">
            Seeking a custom enterprise solution? Let's connect over a virtual coffee to discuss your unique requirements and create a tailored package that fits your needs. Book a call with us or fill out the form to get started.
          </p>
          <div className="flex flex-wrap justify-center mt-6 space-x-4">
            <button className="px-4 py-2 bg-[#F55F42] text-white rounded-lg">Fill in the form</button>
            <button className="px-4 py-2 bg-[#F55F42] text-white rounded-lg">Book a call</button>
          </div>
          <h3 className="mt-6 text-lg font-semibold">Need assistance?</h3>
          <p className="text-center">
            Chat with our support team for help.
          </p>
          <button className="mt-4 px-4 py-2 bg-[#F55F42] text-white rounded-lg">Chat with Support</button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
