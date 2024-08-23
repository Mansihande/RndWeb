import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrolltoTop';

export default function Mainpage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col ">
    <Navbar />
    <div className="">
      <Outlet />
    </div>
    <Footer/>
    <ScrollToTop/>
  </div>
  );
}
