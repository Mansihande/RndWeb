import React from "react";
import ChooseSubscription from "../../images/videos/ChooseSubscriptionsf.mp4";

export default function ChooseSubscriptions() {
  return (
    <div className="flex flex-col lg:flex-row 2xl:justify-center gap-10 px-5 lg:px-28  mt-20">
      {/* Text Content for Large Screens */}
      <div className="w-full lg:w-1/2 2xl:w-1/3 px-4 flex flex-col justify-center order-1">
        <h2 className="text-4xl font-bold pb-6">
          Choose your <span className="text-[#f55f42]">subscription</span>
        </h2>
        <p className="mt-4 text-lg pb-4">
          Our subscription plans offer the flexibility you need to scale your
          business at your own pace. Whether you're looking for a monthly or
          annual subscription, we’ve got you covered with a variety of options
          to suit your business needs. We also offer website packages.
        </p>
        <div className="mt-8 space-y-4">
          <button className="block w-full p-2 text-white bg-[#003b31] text-lg font-bold rounded-2xl">
            Websites
          </button>
          <button className="block w-full p-2 text-white bg-[#f3bc6c] text-lg font-bold rounded-2xl">
            Design
          </button>
          <button className="block w-full p-2 text-white bg-[#f55f42] text-lg font-bold rounded-2xl">
            Social Media
          </button>
          <button className="block w-full p-2 text-white bg-[#003b31] text-lg font-bold rounded-2xl">
            Website Management
          </button>
        </div>
      </div>

      {/* Video Content */}
      <div className="w-full lg:w-1/2 2xl:w-1/3 flex items-center justify-center order-2">
        <div className="relative rounded-2xl bg-[#003b31] m-10 overflow-hidden group transition-all duration-300 ">
          <div className="transition-transform transform group-hover:scale-105 group-hover:translate-x-1 group-hover:translate-y-1">
            <video
              src={ChooseSubscription}
              autoPlay
              muted
              loop
              className="w-full   h-auto rounded-2xl transition-all duration-300"
            />
          </div>
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent m-10 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
}
