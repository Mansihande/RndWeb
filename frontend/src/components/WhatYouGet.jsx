import React from 'react'
import UnlimetedRequest from "../images/WhatWeGive/UnlimitedRequest.gif"
import User from "../images/WhatWeGive/User.gif"
import TopDesign from "../images/WhatWeGive/TopDesign.gif"
import FixedRates from "../images/WhatWeGive/FixedRates.gif"
import CustomPortal from "../images/WhatWeGive/CustomPortal.gif"
import latestTrends from "../images/WhatWeGive/latestTrends.gif"
import FastDilivery from "../images/WhatWeGive/FastDilivery.gif"
import Scalable from "../images/WhatWeGive/Scalable.gif"

export default function WhatYouGet() {
  return (
    <div className="container mx-auto py-40 px-20">
      <div className="text-center mb-40">
        <h2 className="text-5xl font-serif font-bold">What you’ll get with <span className='text-orange-500'>every plan .</span> </h2>
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <li className="flex flex-col items-center text-center">
            <img src={UnlimetedRequest} alt="Unlimited Requests" className="mb-6 lg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Unlimited requests</h3>
            <p>Add as many design requests in your portal as you'd like.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={TopDesign} alt="Top-notch designers" className="mb-6 lg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Top-notch designers</h3>
            <p>You have access to exceptional design quality whenever you need it.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={User} alt="User-oriented" className="mb-6 lg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Business and user-oriented</h3>
            <p>Our custom solutions prioritize user-experience and business objectives.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={FixedRates} alt="Fixed Rates" className="mb-6 lg:w-20 lg:h-20 w-28 h-28  object-contain" />
            <h3 className="text-xl font-semibold  pb-3">Fixed Rates</h3>
            <p>No financial surprises - our monthly pricing is fixed and transparent.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={CustomPortal} alt="Custom portal" className="mb-6 lg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Custom portal</h3>
            <p>Manage projects efficiently with our all-in-one collaboration platform.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={FastDilivery} alt="Fast delivery" className="mb-6 wlg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Fast delivery</h3>
            <p>Expect fast delivery of your designs, one at a time, in just a few days.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={latestTrends} alt="Latest trends" className="mb-6 lg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Latest trends</h3>
            <p>We stay up-to-date on the latest trends in technology and design.</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <img src={Scalable} alt="Scalable" className="mb-6 lg:w-20 lg:h-20 w-28 h-28 object-contain" />
            <h3 className="text-xl font-semibold pb-3">Flexible & scalable</h3>
            <p>You can upgrade, pause, or cancel your subscription any time.</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
