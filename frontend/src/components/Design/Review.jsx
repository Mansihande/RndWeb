import React, { useEffect, useState } from 'react';
import { IoStarSharp, IoStarHalfSharp, IoStarOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<IoStarSharp key={i} />);
    } else if (i < rating) {
      stars.push(<IoStarHalfSharp key={i} />);
    } else {
      stars.push(<IoStarOutline key={i} />);
    }
  }

  return <div className="flex text-yellow-300 text-3xl">{stars}</div>;
};

const Review = () => {
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`/api/testimonial/getTestimonialsHigh`, { withCredentials: true });
        const testimonialData = response.data.data;
        console.log(testimonialData);
        setReview(testimonialData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-10 bg-[#F7F4EE] mt-4 gap-10">
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="w-full max-w-lg">
          {/* Video */}
          {review.video && (
            <video
              width="80%"
              height="200"
              controls
              className="rounded-2xl"
            >
              <source src={review.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start">
        {/* Rating */}
        <RatingStars rating={review.rating} />

        {/* Testimony */}
        <div
          className="mt-4 text-lg text-black text-center lg:text-left"
          dangerouslySetInnerHTML={{ __html: review.testimony }}
        ></div>

        {/* Author and Designation */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-center mt-4 w-full">
          <p className="text-lg font-semibold text-black">{review.name}</p>
           {/* Link to all reviews */}
        <NavLink to="/all-reviews" className="mt-2 text-black hover:underline lg:ml-4">
          See all reviews →
        </NavLink>
        </div>

       
      </div>
    </div>
  );
};

export default Review;
