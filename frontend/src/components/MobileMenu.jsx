import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import navData from '../data/navbardata.json';
import MobileMenuItems from './MobileMenuItems'; // Import the MobileMenuItems component
import { NavLink } from 'react-router-dom';

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div>
      <Hamburger toggled={isMobileMenuOpen} size={25} toggle={toggleMobileMenu} />
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-[6.5rem] p-5 pt-3 bg-[#114038] border-b border-b-white/20 max-h-[calc(100vh-6.5rem)] overflow-y-auto" // Added max height and overflow
          >
            <ul className="grid gap-2 overflow-y-scroll">
              {navData.navLinks.map((link, idx) => (
                <motion.li
                  key={link.path}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 40,
                    delay: 0.1 + idx / 10,
                  }}
                  className="w-full p-1 rounded-xl border border-b-4 border-r-0 border-l-0 border-t-0 overflow-auto"
                >
                  <MobileMenuItems
                    items={link}
                    depthLevel={0} // Pass depth level
                    showMenu={isMobileMenuOpen} // Pass the menu visibility state
                    setShowMenu={toggleMobileMenu} // Allow MobileMenuItems to manage the menu visibility
                  />
                </motion.li>
              ))}
              <div className="flex justify-center items-center space-x-4">
                {navData.authLinks.map((authLink, idx) => (
                  <NavLink
                    key={idx}
                    to={authLink.path}
                    onClick={toggleMobileMenu}
                    className={`${
                      idx === 0 ? 'text-white text-3xl pt-3 font-bold hover:text-[#F55F42]' : 'hidden'
                    }`}
                  >
                    {authLink.label}
                  </NavLink>
                ))}
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
