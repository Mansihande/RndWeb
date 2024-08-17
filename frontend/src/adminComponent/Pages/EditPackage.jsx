import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modules = {
    toolbar: [
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
};

const EditPackageForm = () => {
    const { packageId } = useParams(); // Extract packageId from the URL
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("active");
    const [popular, setPopular] = useState(false);
    const [price, setPrice] = useState(0);
    const [slots, setSlots] = useState(1);
    const [whatYouGet, setWhatYouGet] = useState([]);
    const [whatIsTheir, setWhatIsTheir] = useState([]);
    const [whatIsNotTheir, setWhatIsNotTheir] = useState([]);
    const [categories, setCategories] = useState([]);
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackageDetails(); // Fetch package details using packageId
        fetchCategories(); // Fetch categories for the dropdown
    }, [packageId]); // Add packageId as a dependency
 console.log(packageId)
    const fetchPackageDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3006/api/packages/single/${packageId}`, { withCredentials: true });
            const packageData = response.data;
            setTitle(packageData.title);
            setDescription(packageData.description);
            setStatus(packageData.status);
            setPopular(packageData.popular);
            setPrice(packageData.price);
            setSlots(packageData.slots);
            setWhatYouGet(JSON.parse(packageData.whatYouGet[0] || "[]"));
            setWhatIsTheir(JSON.parse(packageData.whatIsTheir[0] || "[]"));
            setWhatIsNotTheir(JSON.parse(packageData.whatIsNotTheir[0] || "[]"));
            setParentCategoryId(packageData.categories[0] || "");
            setSubCategoryId(packageData.subcategories[0] || "");
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch package details.");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3006/api/services/getall', { withCredentials: true });
            setCategories(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('status', status);
            formData.append('popular', popular);
            formData.append('price', price);
            formData.append('slots', slots);
            formData.append('categories', parentCategoryId);
            formData.append('subcategories', subCategoryId);
            formData.append('whatYouGet', JSON.stringify(whatYouGet));
            formData.append('whatIsTheir', JSON.stringify(whatIsTheir));
            formData.append('whatIsNotTheir', JSON.stringify(whatIsNotTheir));

            await axios.put(`http://localhost:3006/api/packages/updatePackage/${packageId}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            toast.success("Package updated successfully!");
            navigate('/services');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update package. Please try again.");
        }
    };

    const removeItem = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    const addItem = (setter, item) => {
        setter(prev => [...prev, item]);
    };

    const renderInputList = (items, setter) => {
        return items.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
                <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                        const newItems = [...items];
                        newItems[index] = e.target.value;
                        setter(newItems);
                    }}
                    className="w-full p-2 border rounded focus:outline-none"
                />
                <button
                    type="button"
                    onClick={() => removeItem(setter, index)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-700 transition duration-300"
                >
                    Remove
                </button>
            </div>
        ));
    };

    const renderCategoryOptions = (category) => {
        return (
          <option key={category._id} value={category._id} selected={parentCategoryId}>
            {category.category}
          </option>
        );
      };
    
      const renderSubCategoryOptions = (subCategory) => {
        return (
          <option key={subCategory._id} value={subCategory._id} selected={subCategoryId}>
            {subCategory.category}
          </option>
        );
      };
    
    const handleParentCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setParentCategoryId(selectedCategoryId);
        setSubCategoryId("");
    
      };
    
      const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value;
        setSubCategoryId(selectedSubCategoryId);
      
      };
    return (
        <form onSubmit={handleSubmit} className="p-4">
            <ToastContainer />
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Edit Package</h1>

            <div className="mb-4">
        <label htmlFor="parentCategory" className="block font-semibold mb-2">
          Parent Category
        </label>
        <select
          id="parentCategory"
          value={parentCategoryId}
          onChange={handleParentCategoryChange}
          className="w-full p-2 border rounded focus:outline-none"
          required
        >
          <option value="">Select Parent Category</option>
          {categories.map(renderCategoryOptions)}
        </select>
      </div>
      {categories.find(category => category._id === parentCategoryId)?.subCategories?.length>0 && (
        <div className="mb-4">
          <label htmlFor="subCategory" className="block font-semibold mb-2">
            Subcategory
          </label>
          <select
            id="subCategory"
            value={subCategoryId}
            onChange={handleSubCategoryChange}
            className="w-full p-2 border rounded focus:outline-none"
          >
            <option value="">Select Subcategory</option>
            {categories
              .find(category => category._id === parentCategoryId)
              ?.subCategories?.map(renderSubCategoryOptions)}
          </select>
        </div>
      )}

            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                <ReactQuill
                    value={description}
                    onChange={setDescription}
                    modules={modules}
                    className="quill"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block font-semibold mb-2">Price</label>
                <input
                    type="number"
                    id="price"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="slots" className="block font-semibold mb-2">Slots Available</label>
                <input
                    type="number"
                    id="slots"
                    min={1}
                    value={slots}
                    onChange={(e) => setSlots(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">What You Get</label>
                {renderInputList(whatYouGet, setWhatYouGet)}
                <button
                    type="button"
                    onClick={() => addItem(setWhatYouGet, "")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition duration-300"
                >
                    Add What You Get Item
                </button>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">What Is Included</label>
                {renderInputList(whatIsTheir, setWhatIsTheir)}
                <button
                    type="button"
                    onClick={() => addItem(setWhatIsTheir, "")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition duration-300"
                >
                    Add Included Item
                </button>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">What Is Not Included</label>
                {renderInputList(whatIsNotTheir, setWhatIsNotTheir)}
                <button
                    type="button"
                    onClick={() => addItem(setWhatIsNotTheir, "")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition duration-300"
                >
                    Add Not Included Item
                </button>
            </div>

            <div className="mb-4">
                <label htmlFor="status" className="block font-semibold mb-2">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                    required
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="popular" className="flex items-center">
                    <input
                        type="checkbox"
                        id="popular"
                        checked={popular}
                        onChange={(e) => setPopular(e.target.checked)}
                        className="mr-2"
                    />
                    Popular
                </label>
            </div>

            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
            >
                Update Package
            </button>
        </form>
    );
};

export default EditPackageForm;
