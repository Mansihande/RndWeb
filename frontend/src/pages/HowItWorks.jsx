import React from 'react'
import HeroSection from '../components/HowItWorks/HeroSection'
import ChooseSubscriptions from '../components/HowItWorks/ChooseSubscription'
import FastOnBording from '../components/HowItWorks/FastOnBording'
import UnlimitedRequests from '../components/HowItWorks/UnlimitedRequest'
import DownloadAssets from '../components/HowItWorks/DownloadAssests'
import WebSolution from '../components/HowItWorks/WebSolutions'
import WhatYouGet from '../components/WhatYouGet'
import BookAcall from '../components/BookAcall'
import ServiceGrid from '../components/OurServices'
import Footer from '../components/Footer'
import GlobalSolution from '../components/GlobalSolution'
import Faq from '../components/Faq'


export default function HowItWorks() {
  return (
    <div>
    <HeroSection/>
    <ChooseSubscriptions/>
    <FastOnBording/>
    <UnlimitedRequests/>
    <DownloadAssets/>
    <WebSolution/>
    <WhatYouGet/>
   <BookAcall/>
   <GlobalSolution/>
   <Footer/>
    </div>
  )
}
