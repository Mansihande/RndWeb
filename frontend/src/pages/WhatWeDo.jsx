import React from 'react'
import HeroSection from '../components/WhatWeDo/HeroSection'
import Review from '../components/WhatWeDo/Review'
import Challenges from '../components/WhatWeDo/Challenges'
import WhyRnd from '../components/WhatWeDo/WhyRnd'
import ExpertiseComponent from '../components/WhatWeDo/Growth'
import HowRndHelp from '../components/WhatWeDo/HowRndHelp'
import BookAcall from '../components/BookAcall'
import ServiceGrid from '../components/OurServices'
import GlobalSolution from '../components/GlobalSolution'
import Footer from '../components/Footer'

export default function WhatWeDo() {
  return (
 <>
 <HeroSection/>
 <Review/>
 <WhyRnd/>

 <Challenges/>
 <ExpertiseComponent/>
 <HowRndHelp/>
 <BookAcall/>
 <ServiceGrid/>
 <GlobalSolution/>
 <Footer/>
 </>
  )
}
