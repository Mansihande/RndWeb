import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img1 from '../../images/Website/msvg/f1.svg';
import stars from '../../images/Website/msvg/stars.svg'; // Link to the stars image
import { IoMdClose } from 'react-icons/io'; // Import close icon for modal
import play from '../../images/Website/msvg/f4.svg'; // Import your play SVG ico
import { FaPlay } from "react-icons/fa";
import ReviweHeding from "../WhatWeDo/ReviewHeading"
const Gallery = () => {
    const [fullscreenVideo, setFullscreenVideo] = useState(null);
    const [reviews, setReviews] = useState([]);

    const openVideoModal = (src) => {
        setFullscreenVideo(src);
    };

    const closeFullscreen = () => {
        setFullscreenVideo(null);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/testimonial/getTestimonialsFront`, { withCredentials: true });
                setReviews(response.data.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div>
            <div>
                <ReviweHeding/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:px-20 px-12 sm:px-12 mt-40">
                {[0, 1, 2].map((colIndex) => (
                    <div key={colIndex} className="grid grid-cols-1 gap-3">
                        {reviews
                            .filter((_, index) => index % 3 === colIndex)
                            .map((item) => {
                                return (
                                    <div key={item._id} className="relative w-full h-auto">
                                        {/* Handle images */}
                                        {item.photo.length > 0 && (
                                            <img
                                                className="h-auto max-w-full bg-[#f9f7f1] rounded-lg object-cover object-center"
                                                src={`/api/image/download/${item.photo[0]}`} // Replace with the actual path to the image
                                                alt={item.alt[0] || "testimonial-photo"}
                                            />
                                        )}
                                        {/* Handle videos */}
                                        {item.video && (
                                            <button
                                                onClick={() => openVideoModal(`/api/video/download/${item.video}`)} // Replace with the actual path to the video
                                                className="absolute bottom-8 right-3 text-white bg-red-600 p-3 rounded-full flex items-center justify-center"
                                            >
                                              <FaPlay/>
                                            </button>
                                        )}
                                        {/* Handle text */}
                                        <div className="w-full bg-[#f9f7f1] h-auto p-4 rounded-lg shadow-md mt-4">
                                            <p className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: item.testimony }}></p>
                                            <div className="flex items-center">
                                               
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-gray-500">{item.designation}</p>
                                                </div>
                                            </div>
                                            {item.rating && (
                                                <div className="flex items-center mt-2">
                                                    <img className="h-20 w-20 mr-2" src={stars} alt="stars" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                ))}
            </div>

            {/* Fullscreen video view */}
            {fullscreenVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative w-full h-full max-w-screen-lg max-h-screen">
                        <video
                            className="w-full h-full object-contain"
                            src={fullscreenVideo}
                            controls
                            autoPlay
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-3xl"
                            onClick={closeFullscreen}
                        >
                            <IoMdClose />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
