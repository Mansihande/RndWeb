import React, { useState, useRef, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { gsap } from "gsap";

const faqData = [
  {
    question: "Why wouldn't I just hire a full-time designer?",
    answer: "Hiring a full-time designer can be more expensive and less flexible. Our service offers expert design work on a subscription basis, giving you access to top-quality design without the overhead of a full-time employee."
  },
  {
    question: "What happens after I subscribe to a plan?",
    answer: "After subscribing to a plan, you'll receive a welcome email with instructions on how to get started. You'll be able to submit design requests and start receiving high-quality designs."
  },
  {
    question: "Can I try out the service before subscribing?",
    answer: "Yes, we offer a demo video that showcases how our service works. Simply fill out the form and select 'Free Demo' as the topic to receive the video. Additionally, you can book a call with us to have a sales representative answer any questions you may have."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    if (openIndex !== null) {
      gsap.fromTo(
        answerRefs.current[openIndex],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [openIndex]);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      gsap.to(answerRefs.current[openIndex], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => setOpenIndex(null),
      });
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="max-w-4xl sm:w-[63%] md:w-[63%] mx-auto p-4 sm:p-6 lg:max-w-4xl xl:max-w-4xl">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-8 sm:mb-12 lg:mb-20 font-serif">FAQ</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="mb-2 sm:mb-4">
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
            <div className="p-3 sm:p-4 lg:p-5 px-8 sm:px-10 lg:px-12 font-inter text-sm sm:text-base lg:text-base text-justify">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;