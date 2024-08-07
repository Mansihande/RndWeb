import React from "react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import MainPage from "./pages/Mainpage";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import WhatWeDo from "./pages/WhatWeDo";
import Website from "./pages/Website";
import Gallery from "./components/WhatWeDo/AllReviews";
import ErrorBoundary from "./components/ErrorBound";
const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<MainPage />}>
        <Route path="/" index element={<Homepage />} />
        <Route path="services" element={<Services />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/website" element={<Website />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/website/all-reviews" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="templates" element={<Templates />} />
      </Route>
    </>
  )
);
const App = () => (
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
export default App;
