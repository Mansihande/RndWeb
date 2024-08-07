
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import curve from "../../images/curve.svg"
const faqData = [
    {
        question: "Cost-effective",
        answer: "Hiring a team of designers, developers, and social media experts can be expensive. Additionally, it can be challenging to find reliable experts. With our subscription plans, you can get access to all these services at a fraction of the cost of hiring your own team."
    },
    {
        question: "High-quality custom work",
        answer: "In today's market, regularly refreshing and updating creative assets and websites is essential to maintain a competitive edge. Our custom designs are specifically crafted to make you stand out from the crowd.Not only do we create visually appealing designs, but we also implement business incentives, such as lead generation strategies, to optimize your assets. With our services, you'll have easy access to a pool of top-notch designers, right at your fingertips.."
    }
];

const languages = [
    {
        name: 'Save 4 times more on in-house hiring.',
        src: 'https://kolmdesign.com/wp-content/uploads/2024/06/save-time-1-650x650.png',
        alt: 'Save 4 times more on in-house hiring.'
    },
    {
        name: 'Enjoy faster turnaround on digital assets.',
        src: 'https://kolmdesign.com/wp-content/uploads/2024/06/save-time.png',
        alt: 'Enjoy faster turnaround on digital assets.'
    },

];

const WebSolution = () => {
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
            gsap.to(answerRefs.current[index], {
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
        <section className="relative bg-white overflow-hidden">
            {/* Shape Divider */}
          
            <div className='mt-44 2xl:mt-96 flex flex-col items-start justify-center mx-8 md:mx-14 lg:mx-36 2xl:mx-80'>
   

                <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 mt-4">
                    <div className="lg:w-1/2">
                    <div>
                    <h2 className="sm:text-4xl  text-2xl font-semibold mb-4 font-playfair text-black">
                    What is <span className="text-[#F55F42]">Rnd?</span>
                    </h2>
                </div>
                <div>
                    <p className="sm:text-xl text-base mb-8 w-full text-black text-justify font-inter sm:pt-10 pt-7">
                    Rnd is a design agency that offers both unlimited subscription-based design services and one-time website packages, tailored to meet the diverse needs of modern businesses. Our mission is to deliver high-quality, reliable, and efficient design solutions that empower your brand to thrive in a competitive market.                    </p>
                </div>
                        {faqData.map((faq, index) => (
                            <div key={index} className="mb-2 sm:mb-4">
                                <div
                                    className="flex justify-between items-center px-4 sm:px-7 md:px-10 lg:px-14 bg-[#f9f7f1] rounded-[20px] py-3 sm:py-4 lg:py-[14px] cursor-pointer"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <h3 className="text-base sm:text-lg lg:text-xl font-inter font-medium">{faq.question}</h3>
                                    <span className="text-lg sm:text-xl lg:text-2xl">{openIndex === index ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</span>
                                </div>
                                <div
                                    ref={(el) => (answerRefs.current[index] = el)}
                                    className={`overflow-hidden text-black font-inter ${openIndex === index ? 'block' : 'hidden'}`}
                                >
                                    <div className="p-3 sm:p-4 lg:p-5 px-8 sm:px-10 lg:px-12 font-inter text-sm sm:text-base lg:text-base text-justify">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative -top-5 w-full">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="relative w-full rounded-2xl"
                            ></iframe>
                        </div>
                    </div>
                </div>
            
            </div>


 <div>



 </div>

        </section>
    );
};

export default WebSolution;