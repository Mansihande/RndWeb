import React from 'react'
import HeroSection from '../components/HeroSection'
import Marquee from '../components/Marquee'
import OurWorkComponent from '../components/OurWork'
import TrustedSection from '../components/BigCards'
import WeAreExpert from '../components/WeAreExpert'
import ScrollSection from '../components/FirstAnimantion'
import WhatYouGet from '../components/WhatYouGet'
import BookAcall from '../components/BookAcall'
import ServiceGrid from '../components/OurServices'
import Footer from '../components/Footer'
import GlobalSolution from '../components/GlobalSolution'
import Faq from '../components/Faq'

import PremiumTemplatesSection from '../components/PrimiumTemplateSection'
import MainContent from '../components/AboveAnimation'
import CraftLeft from '../components/Design/DesignNeeds'
export default function Homepage() {
  return (
   <>
   <HeroSection/>
   <Marquee/>
   <OurWorkComponent/>
   <TrustedSection/>
   <WeAreExpert/>
   <MainContent/>
  <ScrollSection/>
   <WhatYouGet/>
   <BookAcall/>
   <ServiceGrid/>
   <Faq/>
   <PremiumTemplatesSection/>
   <GlobalSolution/>
   <Footer/>
   {/* <CraftLeft/> */}
   </>
  )
}
