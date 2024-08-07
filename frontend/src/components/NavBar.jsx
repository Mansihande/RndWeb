import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import flames from '../images/flames.png';
import rndlogo from '../images/rndlogo.webp';
import navData from '../data/navbardata.json';
import Submenu from './SubMenu';
import { useClickAway } from 'react-use';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [data, setData] = useState(null);
  const [submenuTimeout, setSubmenuTimeout] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [currentSubmenu, setCurrentSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsMobileMenuOpen(false);
    closeSubmenu();
  });

  useEffect(() => {
    setData(navData);
  }, []);

  const handleMouseEnter = useCallback((submenu) => {
    clearTimeout(submenuTimeout);
    setIsSubmenuOpen(true);
    setCurrentSubmenu(submenu);
  }, [submenuTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      closeSubmenu();
    }, 300); // Adjust timeout as necessary
    setSubmenuTimeout(timeout);
  }, []);

  const handleSubmenuMouseEnter = () => {
    clearTimeout(submenuTimeout);
    setIsSubmenuOpen(true);
  };

  const handleSubmenuMouseLeave = () => {
    handleMouseLeave();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileSubmenuToggle = (link) => {
    if (link.label === 'Services' && link.submenu) {
      setIsSubmenuOpen((prev) => !prev);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
    setCurrentSubmenu(null);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full fixed z-10">
      <nav className="bg-white border-b border-gray-200 xl:mx-12 rounded-b-lg shadow-lg xl:block flex flex-row-reverse">
        <div className="bg-[#003b31] text-white text-center py-1 flex justify-center font-bold text-md xl:flex hidden">
          {data.latestNews} <img src={flames} alt="fire" className="h-6 w-auto" />
        </div>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="lg:hidden" ref={ref}>
            <MobileMenu
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
              data={data}
              handleMobileSubmenuToggle={handleMobileSubmenuToggle}
              isSubmenuOpen={isSubmenuOpen}
            />
          </div>
          <div className="flex items-center space-x-8">
            <img src={rndlogo} alt="Rnd logo" className="h-24" />
          </div>
          <div className="hidden lg:flex items-center space-x-12">
            {data.navLinks.map((link) => (
              <div
                key={link.path}
                className="relative group"
                onMouseEnter={link.label === 'Services' ? () => handleMouseEnter(link.submenu) : null}
                onMouseLeave={link.label === 'Services' ? handleMouseLeave : null}
              >
                <NavLink to={link.path} className="text-gray-700 hover:text-green-700">
                  {link.label}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="lg:flex items-center space-x-4">
            <NavLink
              to={data.authLinks[0].path}
              className="text-gray-800 font-bold hover:text-[#F55F42] hidden lg:block"
            >
              {data.authLinks[0].label}
            </NavLink>
            <NavLink
              to={data.authLinks[1].path}
              className="bg-[#F55F42] text-white py-2 px-4 rounded hover:text-black"
            >
              {data.authLinks[1].label}
            </NavLink>
          </div>
        </div>
        {isSubmenuOpen && currentSubmenu && (
          <div onMouseEnter={handleSubmenuMouseEnter} onMouseLeave={handleSubmenuMouseLeave}>
            <Submenu submenu={currentSubmenu} closeSubmenu={closeSubmenu} />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
