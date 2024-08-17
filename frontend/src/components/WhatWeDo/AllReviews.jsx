import React, { useState } from 'react';
import img1 from '../../images/Website/msvg/f1.svg';
import stars from '../../images/Website/msvg/stars.svg'; // Link to the stars image
import gif from '../../images/Website/msvg/v.gif'; // Link to the GIF
import video from '../../images/Website/msvg/video/grid1.mp4'; // Link to the video
import { IoMdClose } from 'react-icons/io'; // Import close icon for modal
import photo from '../../images/Website/msvg/photo.webp';
import photo2 from '../../images/Website/msvg/photo2.webp';
import play from '../../images/Website/msvg/f4.svg'; // Import your play SVG icon

const testimonials = [
    { id: 1, type: 'image', src: photo, video: video },
    { id: 2, type: 'text', content: '“Excellent work! They really listened and made changes as requested. Very polite and easy to do business with. Highly recommended. Thank you!”', author: 'Diederik Westerbeek', role: 'Owner of multiple e-commerce companies', avatar: img1 },
    { id: 3, type: 'text', content: '“Kolm created a beautiful website that exceeded my design expectations.”', author: 'Cheri Lim', role: 'The learning assembly, Founder', avatar: img1 },
    { id: 4, type: 'text', content: 'What amazing work Kolm delivered.', author: 'Charaf A.', avatar: img1, stars: true },
    { id: 6, type: 'image', src: img1 },
    { id: 7, type: 'text', content: '“Excellent work! They really l”', author: 'Diederik Westerbeek', role: 'Owner of multiple e-commerce companies', avatar: img1 },
    { id: 9, type: 'image', src: gif },
    { id: 5, type: 'image', src: photo2, video: video },
    { id: 10, type: 'text', content: '“Kolm created a beautiful website that exceeded my design expectations.”', author: 'Cheri Lim', role: 'The learning assembly, Founder', avatar: img1 },
];

const Gallery = () => {
    const [fullscreenVideo, setFullscreenVideo] = useState(null);

    const openVideoModal = (src) => {
        setFullscreenVideo(src);
    };

    const closeFullscreen = () => {
        setFullscreenVideo(null);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:px-20 px-12 sm:px-12 mt-40">

           
                {[0, 1, 2].map((colIndex) => (
                    <div key={colIndex} className="grid grid-cols-1 gap-3">
                        {testimonials
                            .filter((_, index) => index % 3 === colIndex)
                            .map((item) => {
                                switch (item.type) {
                                    case 'image':
                                        return (
                                            <div key={item.id} className="relative w-full h-auto">
                                                <img
                                                    className="h-auto max-w-full bg-[#f9f7f1] rounded-lg object-cover object-center"
                                                    src={item.src}
                                                    alt="gallery-photo"
                                                />
                                                {item.video && (
                                                    <button
                                                        onClick={() => openVideoModal(item.video)}
                                                        className="absolute bottom-8 right-3 text-white bg-red-600 p-3 rounded-full flex items-center justify-center"
                                                    >
                                                        <img
                                                            src={play}
                                                            alt="Play"
                                                            className="w-6 h-6"
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    case 'text':
                                        return (
                                            <div key={item.id} className="w-full bg-[#f9f7f1] h-auto p-4 rounded-lg shadow-md">
                                                {item.stars && (
                                                    <div className="flex items-center mb-2">
                                                        <img className="h-20 w-20 mr-2" src={stars} alt="stars" />
                                                    </div>
                                                )}
                                                <p className="text-gray-700 mb-2">{item.content}</p>
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-10 w-10 bg-black rounded-full mr-3"
                                                        src={item.avatar}
                                                        alt={item.author}
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{item.author}</p>
                                                        <p className="text-sm text-gray-500">{item.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
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