import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import rndmenu from '../images/rndmenu.svg'; // Adjust the import based on your file structure
import { IoMdArrowDropupCircle } from "react-icons/io";

const MobileMenuItems = ({ items, depthLevel, showMenu, setShowMenu }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleSubmenuToggle = () => {
    setIsSubmenuOpen((prev) => !prev);
  };

  const handleLinkClick = (hasSubmenu) => {
    if (hasSubmenu) {
      handleSubmenuToggle();
    } else {
      setShowMenu(false); // Close menu if no submenu
      setIsSubmenuOpen(false); // Close submenu
    }
  };

  return (
    <div>
      <NavLink
        to={items.path}
        onClick={() => handleLinkClick(!!items.submenu)}
        className="bg-[#114038] flex justify-between items-center p-2 text-white overflow-auto"
      >
        {items.label}
        {items.submenu && (
          <span
            className={`transform transition-transform duration-800 ${isSubmenuOpen ? 'rotate-180' : ''}`}
          >
            <IoMdArrowDropupCircle />
          </span>
        )}
      </NavLink>

      {/* Render submenu if open */}
      {isSubmenuOpen && items.submenu && (
        <div className={`transition-all duration-300 ease-in-out p-6 bg-[#114038]`}>
          {/* Left Section: Last Submenu Link */}
          <div className="flex-none w-full p-4 bg-[#E7DECB] rounded-xl">
            <div className="px-4 py-6">
              <span className="font-bold text-2xl py-4">{items.submenu[items.submenu.length - 1].label}</span>
              <p className="text-gray-600 text-justify">{items.submenu[items.submenu.length - 1].subtext}</p>
              <div className="flex pt-8 justify-between">
                <NavLink
                  to={items.submenu[items.submenu.length - 1].path}
                  onClick={() => { setShowMenu(false); setIsSubmenuOpen(false); }} // Close both menus
                  className="text-green-600 font-semibold underline hover:underline cursor-pointer"
                >
                  Learn More
                </NavLink>
                <img src={rndmenu} alt="Service Image" className="h-32 w-auto" />
              </div>
            </div>
          </div>

          {/* Middle Section: Submenu Links */}
          <div className="flex-1 py-8 px-4 max-h-70 overflow-y-auto"> {/* Set max height and enable scroll */}
            {items.submenu.slice(0, -1).map((item, index) => ( // Exclude the last item
              <div
                key={index}
                className="group px-4 py-2 cursor-pointer hover:text-orange-600"
              >
                <NavLink 
                  to={item.path}
                  onClick={() => { setShowMenu(false); setIsSubmenuOpen(false); }} // Close both menus
                >
                  <span className="font-bold text-white group-hover:text-orange-600">{item.label}</span>
                  <p className="text-white text-sm group-hover:text-orange-600">{item.subtext}</p>
                  <hr className="border-1 border-white my-1 group-hover:border-orange-600" />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenuItems;
