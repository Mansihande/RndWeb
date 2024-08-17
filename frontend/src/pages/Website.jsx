import React from 'react'
import HeroSection from '../components/Websites/HeroSection'
import Review from '../components/Websites/Review'

import CraftLeft from '../components/Websites/CraftLeft'
import CraftRight from '../components/Websites/CraftRight'
import WebSolution from '../components/HowItWorks/WebSolutions'
import LatestProduct from '../components/Websites/LatestProduct'
import DesignProcess from '../components/Websites/DesignProcess'
import Companies from '../components/Websites/Companies'
import WhyPartnerWithUs from '../components/Websites/WhyPatnerUs'
import FAQ from '../components/Faq'
import BookAcall from '../components/BookAcall'
import Footer from '../components/Footer'
import HowRndHelp from '../components/WhatWeDo/HowRndHelp'
import De from '../components/Websites/De'
import PricingSection from '../components/Websites/Packages'
export default function Website() {
  return (
    <div>
    <HeroSection/>
    <Review/>
    <CraftRight/>
     <CraftLeft/>  
     <LatestProduct/>
     <Companies/>
     <WhyPartnerWithUs/> 
    <PricingSection/>
     <De/>
    {/* <DesignProcess/> */}
    <FAQ/>
    <BookAcall/>
    <Footer/>
    </div>
  )
}

