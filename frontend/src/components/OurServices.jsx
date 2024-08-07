import React from "react";

const data = [
  {
    title: "Website",
    description:
      "Do you require a Website with a reliable CMS in order to scale your business? View our solutions.",
    tag: "Package or Subscription",
    bgColor: "#114038",
    image:
      "https://kolmdesign.com/wp-content/uploads/2023/08/Website-service.webp",
  },
  {
    title: "Website Audit",
    description:
      "Seeking guidance for your existing website? Fill in the form and receive a tailored report within 48 hours.",
    tag: "One-time payment",
    bgColor: "#114038",
  },
  {
    title: "Design",
    description:
      "Unlimited design right at your fingertips. Explore our range of subscription solutions that suit your requirements.",
    tag: "Subscription Only",
    bgColor: "#114038",
    image: "https://kolmdesign.com/wp-content/uploads/2023/08/design.webp",
  },
  {
    title: "Website Management",
    description:
      "Seeking additional support for your website’s design and development? Explore our range of subscription solutions.",
    tag: "Subscription Only",
    bgColor: "#114038",
  },
  {
    title: "Social Media",
    description:
      "Our solutions are designed to elevate your social media channels, fostering engagement and enhancing your reputation through top-notch design.",
    tag: "Subscription Only",
    bgColor: "#114038",
    image:
      "https://kolmdesign.com/wp-content/uploads/2023/08/Socialmedia-service.webp",
  },
];

export default function CSSGrid() {
  return (
<div className="mt-40 ">  
<div className="container mx-auto pb-20">
    <h2 className="text-5xl font-serif text-center ">Our Services</h2>
</div>

<div className="container mx-auto py-10 grid grid-cols-12 gap-6 p-10 ">
      {/* First Row */}
      <div className="col-span-12 md:col-span-6 xl:col-span-6 bg-[#114038] text-white rounded-2xl flex flex-col md:flex-row relative">
        <div className="p-6 flex-1">
          <p className="bg-white px-2 py-1 text-sm rounded-full text-black w-fit mb-8">
            {data[0].tag}
          </p>
          <h3 className="text-5xl font-serif">{data[0].title}</h3>
          <p>{data[0].description}</p>
        </div>
        {data[0].image && (
          <div className="flex-shrink-0 hidden md:block">
            <img
              src={data[0].image}
              alt={data[0].title}
              className="xl:h-64 xl:w-64 h-48 w-48 rounded"
            />
          </div>
        )}
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-3 bg-[#35210c] text-white p-6 rounded-2xl relative">
        <p className="bg-white px-2 py-1 text-sm rounded-full text-black w-fit mb-8">
          {data[1].tag}
        </p>
        <h3 className="text-4xl font-serif">{data[1].title}</h3>
        <p>{data[1].description}</p>
      </div>
      <div className="col-span-12 md:col-span-12 xl:col-span-3 xl:row-span-2 bg-[#ecaa47] text-white  rounded-2xl relative md:flex lg:block">
        <div className="p-6">
          <p className="bg-white px-2 py-1 text-sm rounded-full text-black w-fit mb-8">
            {data[2].tag}
          </p>
          <h3 className="text-5xl font-serif">{data[2].title}</h3>
          <p>{data[2].description}</p>
        </div>
        {data[2].image && (
          <div className="hidden md:inline-block ">
            <img
              src={data[2].image}
              alt={data[2].title}
              className="xl:h-96 xl:w-96 h-64 w-64 rounded"
            />
          </div>
        )}
      </div>

      {/* Second Row */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 bg-[#233242] text-white p-6 rounded-2xl relative">
        <p className="bg-white px-2 py-1 text-sm rounded-full text-black w-fit mb-8">
          {data[3].tag}
        </p>
        <h3 className="text-3xl font-serif">{data[3].title}</h3>
        <p>{data[3].description}</p>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-6 bg-[#1f5a50] text-white rounded-2xl flex flex-col md:flex-row relative">
        <div className="flex-1 p-6">
          <p className="bg-white px-2 py-1 text-sm rounded-full text-black w-fit mb-8">
            {data[4].tag}
          </p>
          <h3 className="text-5xl font-serif">{data[4].title}</h3>
          <p>{data[4].description}</p>
        </div>
        {data[4].image && (
          <div className="hidden md:block">
            <img
              src={data[4].image}
              alt={data[4].title}
              className="h-52 w-52 rounded"
            />
          </div>
        )}
      </div>
    </div>
</div>


 
  );
}
