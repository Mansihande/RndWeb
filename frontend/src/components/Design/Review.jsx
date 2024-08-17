import React, { useEffect, useState } from 'react';
import { IoStarSharp, IoStarHalfSharp, IoStarOutline } from 'react-icons/io5';
import reviewsData from '../../data/reviewWhatWeDo.json'; // Adjust the path as necessary
import { NavLink } from 'react-router-dom';

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
    const fetchReview = async () => {
      const data = await Promise.resolve(reviewsData);
      setReview(data[0]);
    };

    fetchReview();
  }, []);

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-10 bg-[#F7F4EE] mt-4 gap-10">
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="w-full max-w-lg">
          <iframe
            width="100%"
            height="240"
            src={review.videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start">
        <RatingStars rating={review.rating} />
        <p className="mt-4 text-lg text-black text-center lg:text-left">{review.text}</p>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-center mt-4 w-full">
          <p className="text-lg font-semibold text-black">{review.author}</p>
          <NavLink to="/all-reviews" className="mt-2 text-black hover:underline lg:ml-4">
            See all reviews →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Review;
