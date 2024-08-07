import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import rndmenu from '../images/rndmenu.svg';
import rndlogo from '../images/rndlogo.webp';
import flames from '../images/flames.png';

const Submenu = ({ submenu, onMouseLeave, setShowMenu }) => { // Add setShowMenu prop
  const defaultImage = submenu[0].image;
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index) => {
    if (!isHovered) {
      console.log(`Mouse enter on item ${index}`);
      setIsHovered(true);
      if (index === 0) {
        setCurrentImage(rndmenu);
      } else if (index === 1) {
        setCurrentImage(rndlogo);
      } else if (index === 2 || index === 3) {
        setCurrentImage(flames);
      }
    }
  };

  const handleMouseLeaveItem = () => {
    console.log('Mouse leave');
    setIsHovered(false);
    setCurrentImage(defaultImage);
  };

  const handleClick = (path) => {
    console.log(`Navigating to ${path}`);
    setShowMenu(false); // Close the menu on item click
  };

  return (
    <div className="flex" onMouseLeave={onMouseLeave}>
      <div className="flex-none w-1/3 p-4 bg-[#E7DECB]">
        <div className="px-4 py-6">
          <span className="font-bold text-2xl py-4">{submenu[submenu.length - 1].label}</span>
          <p className="text-gray-600 text-justify">{submenu[submenu.length - 1].subtext}</p>
          <div className="flex pt-8 justify-between">
            <NavLink 
              to={submenu[submenu.length - 1].path} 
              className="text-green-600 font-semibold underline hover:underline cursor-pointer" 
              onClick={() => handleClick(submenu[submenu.length - 1].path)} // Close menu
            >
              Learn More
            </NavLink>
            <img src={rndmenu} alt="Service Image" className="h-32 w-auto" />
          </div>
        </div>
      </div>
      <div className="flex-1 py-8 px-4">
        {submenu.slice(0, -1).map((item, index) => (
          <div
            key={index}
            className="group px-4 py-2 cursor-pointer hover:text-orange-600"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeaveItem}
          >
            <NavLink 
              to={item.path} 
              onClick={() => handleClick(item.path)} // Close menu on click
            >
              <span className="font-bold group-hover:text-orange-600">{item.label}</span>
              <p className="text-gray-500 text-sm group-hover:text-orange-600">{item.subtext}</p>
              <hr className="border-1 border-gray-900 my-1 group-hover:border-orange-600" />
            </NavLink>
          </div>
        ))}
      </div>
      <div className="flex-none w-1/3 p-4">
        <img src={currentImage} alt="Hovered Image" className="h-32 w-auto" />
      </div>
    </div>
  );
};

export default Submenu;
