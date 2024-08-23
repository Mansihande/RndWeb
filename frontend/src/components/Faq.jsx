import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { gsap } from 'gsap';
import axios from 'axios';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const answerRefs = useRef([]);

  useEffect(() => {
    // Fetch FAQ data
    axios.get('/api/faq/getFAQWebsite')
      .then((response) => {
        setFaqs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching FAQ data:', error);
        setLoading(false);
      });

    // Fetch page heading and subheading
    axios.get('/api/pageHeading/heading?pageType=faq')
      .then((response) => {
        setHeading(response.data.heading);
        setSubheading(response.data.subheading);
      })
      .catch((error) => {
        console.error('Error fetching page heading data:', error);
      });
  }, []);

  useEffect(() => {
    if (openIndex !== null) {
      gsap.fromTo(
        answerRefs.current[openIndex],
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power1.out' }
      );
    }
  }, [openIndex]);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      gsap.to(answerRefs.current[openIndex], {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => setOpenIndex(null),
      });
    } else {
      setOpenIndex(index);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl sm:w-[63%] md:w-[63%] mx-auto p-4 sm:p-6 lg:max-w-4xl xl:max-w-4xl">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-4 sm:mb-6 lg:mb-8 font-serif">{heading}</h2>
      {faqs.map((faq, index) => (
        <div key={faq._id} className="mb-2 sm:mb-4">
          <div
            className="flex justify-between items-center px-4 sm:px-7 md:px-10 lg:px-14 bg-[#f9f7f1] rounded-[20px] py-3 sm:py-4 lg:py-[17px] cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-inter font-medium">{faq.question}</h3>
            <span className="text-lg sm:text-xl lg:text-2xl">{openIndex === index ? <FaMinus /> : <FaPlus />}</span>
          </div>
          <div
            ref={(el) => (answerRefs.current[index] = el)}
            className={`overflow-hidden ${openIndex === index ? 'block' : 'hidden'}`}
          >
            <div
              className="p-3 sm:p-4 lg:p-5 px-8 sm:px-10 lg:px-12 font-inter text-sm sm:text-base lg:text-base text-justify"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
