import React from 'react'
import ProjectFeatures from '../components/Project/ProjectFeature'
import Marquee from '../components/Project/Marquee'
import ProjectsSection from '../components/Project/ProjectSection'
import PremiumTemplatesSection from '../components/PrimiumTemplateSection'
import GlobalSolution from '../components/GlobalSolution'
import Footer from '../components/Footer'

export default function Projects() {
  return (
   <div>
   <ProjectFeatures/>
   <Marquee/>
   <ProjectsSection/>
   <PremiumTemplatesSection/>
   <GlobalSolution/>
   <Footer/>
   </div>
  )
}
