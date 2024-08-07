
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
    },
    {
        question: "Can I try out the service",
        answer: "Yes, we offer a demo video that showcases how our service works. Simply fill out the form and select 'Free Demo' as the topic to receive the video. Additionally, you can book a call with us to have a sales representative answer any questions you may have."
    },
    {
        question: "hey how are you",
        answer: "Yes, we offer a demo video that showcases how our service works. Simply fill out the form and select 'Free Demo' as the topic to receive the video. Additionally, you can book a call with us to have a sales representative answer any questions you may have."
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
    {
        name: 'Fast onboarding. Start right away with our service.',
        src: 'https://kolmdesign.com/wp-content/uploads/2024/06/fast-onboarding.png',
        alt: 'Fast onboarding. Start right away with our service.'
    },
    {
        name: 'No more coordinating freelancers or slow agencies.',
        src: 'https://kolmdesign.com/wp-content/uploads/2024/06/stress-free-1.png',
        alt: 'No more coordinating freelancers or slow agencies.'
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
        <section className="relative bg-[#114038] overflow-hidden">
            {/* Shape Divider */}
            <div className="absolute inset-x-0 top-0">
                <svg
                    className="w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                >
                    <path
                        className="fill-current text-white"
                        d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
                    />
                </svg>
            </div>
            <div className='mt-44 2xl:mt-96 flex flex-col items-start justify-center mx-8 md:mx-14 lg:mx-36 2xl:mx-80'>
                <div>
                    <h2 className="sm:text-5xl  text-3xl font-semibold mb-4 font-playfair text-white">
                        Subscription-based <span className="text-[#F55F42]">web solutions</span>
                    </h2>
                </div>
                <div>
                    <p className="sm:text-xl text-base mb-8 w-full text-white text-justify font-inter sm:pt-10 pt-7">
                        Our subscription model offers a sustainable solution for businesses to regularly update design assets and meet market expectations. Our approach maximizes design efficiency and reliability, blending high-quality creativity with productivity in a tech-driven era.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 mt-4">
                    <div className="lg:w-1/2">
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
                                    className={`overflow-hidden text-white font-inter ${openIndex === index ? 'block' : 'hidden'}`}
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
                <div className="mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-8 2xl:gap-40 pb-32">
                    {languages.map((language, index) => (
                        <div key={index} className="text-center space-y-4">
                            <img
                                loading="lazy"
                                decoding="async"
                                src={language.src}
                                alt={language.alt}
                                className="sm:w-28  sm:h-28 lg:w-32 lg:h-32 2xl:h-80 2xl:w-80  w-28 h-28  object-cover mx-auto"
                            />
                            <h3 className="lg:text-base text-sm font-semibold font-inter text-white">{language.name}</h3>
                        </div>
                    ))}
                </div>
            </div>


 <div>
 <div className="absolute inset-x-0 bottom-0">
        <svg
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            className="fill-current text-white"
            d="M421.9,93.5c22.6,2.5,51.5-0.4,75.5-5.3c23.6-4.9,70.9-23.5,100.5-35.7c75.8-32.2,133.7-44.5,192.6-49.7c23.6-2.1,48.7-3.5,103.4,2.5c54.7,6,106.2,25.6,106.2,25.6V100H0V69.7c0,0,72-32.6,158.4-30.5c39.2,0.7,92.8,6.7,134,22.4c21.2,8.1,52.2,18.2,79.7,24.2C399.3,92.1,411.6,92.5,421.9,93.5z"
          />
        </svg>
      </div>


 </div>

        </section>
    );
};

export default WebSolution;