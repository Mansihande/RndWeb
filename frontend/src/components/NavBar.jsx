import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios
import flames from "../images/flames.png";
import rndlogo from "../images/rndlogo.png";
import Submenu from "./SubMenu";
import MobileMenu from "./MobileMenu";

const transformData = (fetchedData) => {
  const transformSubmenu = (submenu) => ({
    path: `/${submenu.pagename.toLowerCase().replace(/\s+/g, '-')}`,
    label: submenu.pagename,
    subtext: submenu.details,
    image: submenu.photo
  });

  const transformNavLink = (item) => ({
    path: `/${item.pagename.toLowerCase().replace(/\s+/g, '-')}`,
    label: item.pagename,
    submenu: item.submenus ? item.submenus.map(transformSubmenu) : []
  });

  return {
    latestNews: "Latest News – Slots are filling up fast! Book yours now.",
    navLinks: fetchedData
      .filter(item => item.priority <= 5) // Filter to include only the relevant nav links
      .map(transformNavLink),
    authLinks: [
      { path: "/login", label: "Log-in / Sign-up" },
      { path: "/get-started", label: "Get Started" }
    ]
  };
};

const Navbar = () => {
  const [data, setData] = useState(null);
  const [submenuTimeout, setSubmenuTimeout] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [currentSubmenu, setCurrentSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API and transform it
    axios.get('http://localhost:3006/api/menulisting/fetchMenuWithSubmenus')
      .then(response => {
        const transformedData = transformData(response.data);
        setData(transformedData);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const handleMouseEnter = useCallback(
    (submenu) => {
      console.log("Mouse entered on submenu, submenu opened:", submenu);
      clearTimeout(submenuTimeout);
      setIsSubmenuOpen(true);
      setCurrentSubmenu(submenu);
    },
    [submenuTimeout]
  );

  const handleMouseLeave = useCallback(() => {
    console.log("Mouse left, starting timeout to close submenu.");
    const timeout = setTimeout(() => {
      closeSubmenu();
    }, 300);
    setSubmenuTimeout(timeout);
  }, []);

  const handleSubmenuMouseEnter = () => {
    console.log("Mouse entered submenu, canceling close timeout.");
    clearTimeout(submenuTimeout);
    setIsSubmenuOpen(true);
  };

  const handleSubmenuMouseLeave = () => {
    console.log("Mouse left submenu, starting timeout to close submenu.");
    handleMouseLeave();
  };

  const toggleMobileMenu = () => {
    console.log("Toggling mobile menu.");
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileSubmenuToggle = (link) => {
    if (link.label === "Services" && link.submenu) {
      console.log("Toggling mobile submenu for Services.");
      setIsSubmenuOpen((prev) => !prev);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const closeSubmenu = () => {
    console.log("Closing submenu.");
    setIsSubmenuOpen(false);
    setCurrentSubmenu(null);
  };

  const handleClick = (path) => {
    console.log("NavLink clicked, closing submenu and navigating to:", path);
    closeSubmenu();
    navigate(path);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full fixed z-10">
      <nav className="bg-white border-b border-gray-200 xl:mx-12 rounded-b-lg shadow-lg xl:block flex flex-row-reverse">
        <div className="bg-[#333] text-white text-center py-1 flex justify-center font-bold text-md xl:flex hidden">
          {data.latestNews}{" "}
          <img src={flames} alt="fire" className="h-6 w-auto" />
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
            <NavLink to="/">
              <img src={rndlogo} alt="Rnd logo" className="h-12 my-3" />
            </NavLink>
          </div>
          <div className="hidden lg:flex items-center space-x-12">
            {data.navLinks.map((link) => (
              <div
                key={link.path}
                className="relative group"
                onMouseEnter={
                  link.submenu.length
                    ? () => handleMouseEnter(link.submenu)
                    : null
                }
                onMouseLeave={
                  link.submenu.length ? handleMouseLeave : null
                }
              >
                <NavLink
                  to={link.path}
                  className="text-gray-700 hover:text-green-700"
                  onClick={() => handleClick(link.path)}
                >
                  {link.label}
                </NavLink>
        
              </div>
            ))}
          </div>
          <div className="lg:flex items-center space-x-4">
            <NavLink
              to={data.authLinks[0].path}
              className="text-gray-800 font-bold hover:text-[#f3ca0d] hidden lg:block "
            >
              {data.authLinks[0].label}
            </NavLink>
            <NavLink to={data.authLinks[1].path} className="">
              <div className="flex lg:flex-row flex-col justify-center bg-[#f3ca0d] px-4 py-1 mb-2 lg:mb-0 text-white rounded hover:text-black items-center">
                <span>{data.authLinks[1].label.split(" ")[0]}</span>
                <span>{data.authLinks[1].label.split(" ").slice(1).join(" ")}</span>
              </div>
            </NavLink>
          </div>
  
        </div>
        {isSubmenuOpen && currentSubmenu && (
                  <div
                    onMouseEnter={handleSubmenuMouseEnter}
                    onMouseLeave={handleSubmenuMouseLeave}
                  >
                    <Submenu submenu={currentSubmenu} onMouseLeave={closeSubmenu} setShowMenu={closeSubmenu} />
                  </div>
                )}
      </nav>
    </div>
  );
};

export default Navbar;
