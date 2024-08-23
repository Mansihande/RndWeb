import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroSection = ({ categoryId }) => {
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");
    const [loading, setLoading] = useState(true);

    const notifySuccess = () => {
        toast.success("Updated Successfully!");
    };

    const notifyError = (message) => {
        toast.error(message);
    };

    // Fetch headings from the API
    const fetchHeadings = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/herosection/${categoryId}`, { withCredentials: true });
            const { heading, subheading } = response.data || {};
            setHeading(heading || '');
            setSubheading(subheading || '');
        } catch (error) {
            console.error(error);
            notifyError("Failed to fetch headings");
            setHeading('');
            setSubheading('');
        } finally {
            setLoading(false);
        }
    };

    // Save headings to the API
    const saveHeadings = async (categoryId) => {
        try {
            setLoading(true);
            await axios.put(`/api/herosection/${categoryId}`, { // Pass categoryId as a URL parameter
                heading,
                subheading,
            }, { withCredentials: true });
            notifySuccess();
        } catch (error) {
            console.error(error);
            notifyError("Failed to save headings");
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes for heading and subheading
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "heading") {
            setHeading(value);
        } else if (name === "subheading") {
            setSubheading(value);
        }
    };

    // Fetch headings on component mount and when categoryId changes
    useEffect(() => {
        if (categoryId) {
            fetchHeadings();
        }
    }, [categoryId]);

    return (
        <div className="p-4 overflow-x-auto">
            <ToastContainer />
            <div className="mb-8 border border-gray-200 shadow-lg p-4 rounded ">
                <div className="grid md:grid-cols-2 md:gap-2 grid-cols-1">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Heading</label>
                        <input
                            type="text"
                            name="heading"
                            value={heading}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 uppercase font-serif">Subheading</label>
                        <input
                            type="text"
                            name="subheading"
                            value={subheading}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                    </div>
                </div>
                <button
                    onClick={() => saveHeadings(categoryId)} // Pass the categoryId as a parameter
                    disabled={loading}
                    className={`px-4 py-2 rounded hover:bg-slate-900 transition duration-300 font-serif ${loading ? 'bg-gray-400' : 'bg-slate-700 text-white'}`}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
