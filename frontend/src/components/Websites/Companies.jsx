import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = location.pathname.split('/').filter(Boolean).pop();
        const photoType = "company"; // Your logic for filtering the photoType

        const response = await axios.get(`/api/serviceImages/front/${slug}/${photoType}`, { withCredentials: true });
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
  }, [location.pathname]);

  return (
    <div className=''>
      <div className="py-6 lg:pt-20 pt-5 px-4 mt-20">
        <h1 className="text-2xl md:text-3xl lg:text-3xl text-black font-medium text-center">
          Companies that use WordPress
        </h1>
      </div>
      <div className="py-6 mx-4 sm:mx-8 lg:mx-16 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {companies.map((company, index) => (
             <img
             src={`/api/serviceImages/download/${company.images}`} // Ensure the correct path
             alt={company.alt}
             className="object-cover rounded-3xl"
           />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
