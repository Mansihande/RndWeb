import React from 'react';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

export default function Mainpage() {
  return (
    <div className="min-h-screen flex flex-col ">
    <Navbar />
    <div className="">
      <Outlet />
    </div>
  </div>
  );
}
