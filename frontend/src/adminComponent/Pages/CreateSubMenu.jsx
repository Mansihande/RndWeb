import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewSubmenuListingForm = () => {
    const [pagename, setPagename] = useState("");
    const [alt, setAlt] = useState("");
    const [photo, setPhoto] = useState(null);
    const [priorityOptions, setPriorityOptions] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(1);
    const [menuListOptions, setMenuListOptions] = useState([]);
    const [selectedMenuList, setSelectedMenuList] = useState("");
    const [details, setDetails] = useState(""); // New field for details
    const navigate = useNavigate();

    useEffect(() => {
        fetchPriorityOptions();
        fetchMenuListOptions(); // Fetch the parent menu options
    }, []);

    const fetchPriorityOptions = async () => {
        try {
            const response = await axios.get('/api/submenulisting/getSubmenulistings', { withCredentials: true });
            const count = response.data.count;
            setPriorityOptions(count > 0 ? Array.from({ length: count + 1 }, (_, i) => i + 1) : [1]);
        } catch (error) {
            console.error(error);
            setPriorityOptions([1]);
        }
    };

    const fetchMenuListOptions = async () => {
        try {
            const response = await axios.get('/api/menulisting/getMenulisting', { withCredentials: true });
            setMenuListOptions(response.data.menuListings);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleDeletePhoto = () => {
        setPhoto(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('pagename', pagename);
            formData.append('alt', alt);
            formData.append('photo', photo);
            formData.append('priority', selectedPriority);
            formData.append('parent', selectedMenuList); // Add selected menu list to formData
            formData.append('details', details); // Add details to formData

            const response = await axios.post('/api/submenulisting/createSubmenulisting', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            setPagename("");
            setAlt("");
            setPhoto(null);
            setDetails(""); // Clear details field
            setSelectedMenuList(""); // Clear selected menu list
            navigate('/menulisting');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Submenu Listing</h1>
            <div className="mb-4">
                <label htmlFor="pagename" className="block font-semibold mb-2">
                    Page Name
                </label>
                <input
                    type="text"
                    id="pagename"
                    value={pagename}
                    onChange={(e) => setPagename(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="parentMenu" className="block font-semibold mb-2">
                    Parent Menu
                </label>
                <select
                    id="parentMenu"
                    className="w-full p-2 border rounded focus:outline-none"
                    value={selectedMenuList}
                    onChange={(e) => setSelectedMenuList(e.target.value)}
                    required
                >
                    <option value="">Select Parent Menu</option>
                    {menuListOptions.map(menu => (
                        <option key={menu._id} value={menu._id}>
                            {menu.pagename}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="photo" className="block font-semibold mb-2">
                    Photo
                </label>
                <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={handlePhotoChange}
                    className="border rounded focus:outline-none"
                    accept="image/*"
                />
                {photo && (
                    <div className="mt-2 w-56 relative group">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="Submenu Listing"
                            className="h-32 w-56 object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleDeletePhoto}
                            className="absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                        >
                            X
                        </button>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="alt" className="block font-semibold mb-2">
                    Alternative Text
                </label>
                <input
                    type="text"
                    id="alt"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="details" className="block font-semibold mb-2">
                    Details
                </label>
                <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    rows="4"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className="block font-semibold mb-2">
                    Priority
                </label>
                <select
                    id="priority"
                    className="w-full p-2 border rounded focus:outline-none"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(parseInt(e.target.value))}
                    required
                >
                    {priorityOptions.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Submenu Listing
            </button>
        </form>
    );
};

export default NewSubmenuListingForm;