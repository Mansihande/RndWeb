import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import rndmenu from '../images/rndmenu.svg';

const Submenu = ({ submenu, onMouseLeave, setShowMenu }) => {
  const navigate = useNavigate();
  const defaultImage = submenu[0].image;
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index) => {
    if (!isHovered) {
      console.log("Submenu item hovered, changing image:", submenu[index].image);
      setIsHovered(true);
      setCurrentImage(submenu[index].image);
    }
  };

  const handleMouseLeaveItem = () => {
    console.log("Mouse left submenu item, resetting image.");
    setIsHovered(false);
    setCurrentImage(defaultImage);
  };

  const handleClick = (e, path) => {
    setShowMenu(false)
    navigate(path);      // Navigates to the path
   
  };
  

  return (
    <div className="flex " onMouseLeave={onMouseLeave}>
      <div className="flex-none w-1/3 p-4 bg-[#E7DECB]">
        <div className="px-4 py-6">
          <span className="font-bold text-2xl py-4">{submenu[submenu.length - 1].label}</span>
          <p className="text-gray-600 text-justify">{submenu[submenu.length - 1].subtext}</p>
          <div className="flex pt-8 justify-between">
            <NavLink 
              to={submenu[submenu.length - 1].path} 
              className="text-green-600 font-semibold underline hover:underline cursor-pointer" 
              onClick={(e) => handleClick(e, submenu[submenu.length - 1].path)}
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
              onClick={(e) => handleClick(e, item.path)}
            >
              <span className="font-bold group-hover:text-orange-600">{item.label}</span>
              <p className="text-gray-500 text-sm group-hover:text-orange-600">{item.subtext}</p>
              <hr className="border-1 border-gray-900 my-1 group-hover:border-orange-600" />
            </NavLink>
          </div>
        ))}
      </div>
      <div className="flex-none w-1/3 bg-cover" style={{ backgroundImage: `url(${currentImage})` }} />
    </div>
  );
};

export default Submenu;
