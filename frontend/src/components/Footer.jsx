import React from 'react';
import footerData from "../data/Footer.json"; // Adjust the path as needed
import rndlogo from "../images/rndlogo.png";

const Footer = () => {
  return (
    <footer className="bg-[#F7F4EE] text-black md:px-36 px-10 py-10">
      <section className="container mx-auto py-10">
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1 col-span-3 ">
            <img
              src={rndlogo}
              alt="kolm-footer-logo"
              className="mb-4 h-16"
            />
            <p className='text-lg text-left'>
              {footerData.description}
            </p>
          </div>
          <div className="lg:col-span-1  ">
            <h4 className="font-bold text-md mb-16 ">Follow</h4>
            <ul>
              {footerData.followLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="md:text-lg text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold text-md mb-16">About</h4>
            <ul>
              {footerData.aboutLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="md:text-lg text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold text-md mb-16">Legal</h4>
            <ul>
              {footerData.legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="md:text-lg text-sm">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1 col-span-3">
            <h4 className="font-bold text-lg mb-2 flex">Weekly design juice</h4>
            <form method="post" action="">
              <div className="flex flex-col gap-4">
                <input
                  type="name"
                  name="name"
                  className="flex-1 px-4 py-2 w-52 rounded-md"
                  placeholder="Your Email"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="flex-1 px-4 py-2 w-52 rounded-md"
                  placeholder="Your Email"
                  required
                />
                <button type="submit" className="px-4 py-2 w-52 bg-[#F55F42] text-white rounded-md hover:bg-orange-600">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
