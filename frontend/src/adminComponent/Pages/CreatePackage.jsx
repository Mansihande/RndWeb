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

const NewPackageForm = () => {
    const { categoryId } = useParams(); // Get category ID from URL
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [status, setStatus] = useState("active");
    const [popular, setPopular] = useState(false);
    const [price, setPrice] = useState(0);
    const [slots, setSlots] = useState(1);
    const [whatYouGet, setWhatYouGet] = useState([]);
    const [whatIsTheir, setWhatIsTheir] = useState([]);
    const [whatIsNotTheir, setWhatIsNotTheir] = useState([]);
    const [categories, setCategories] = useState([]);
    const [parentCategoryId, setParentCategoryId] = useState(categoryId);
    const [subCategoryId, setSubCategoryId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3006/api/services/getall', { withCredentials: true });
            setCategories(response.data);
        } catch (error) {
            console.error(error);
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

            const response = await axios.post('http://localhost:3006/api/packages/insertPackage', formData, {
                headers: {
                    'Content-Type': 'application/json' // Specify JSON content type
                },
                withCredentials: true
            });

            toast.success("Package added successfully!");
            resetForm();
            navigate('/services'); // Navigate to packages list or desired route
        } catch (error) {
            console.error(error);
            toast.error("Failed to add package. Please try again.");
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setStatus("active");
        setPopular(false);
        setPrice(0);
        setSlots(1);
        setWhatYouGet([]);
        setWhatIsTheir([]);
        setWhatIsNotTheir([]);
        setParentCategoryId("");
        setSubCategoryId("");
        setPhotos([]);
    };

    const renderCategoryOptions = (category) => (
        <option key={category._id} value={category._id}>
            {category.category}
        </option>
    );

    const handleParentCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setParentCategoryId(selectedCategoryId);
        setSubCategoryId("");
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategoryId = e.target.value;
        setSubCategoryId(selectedSubCategoryId);
    };

    const subCategories = categories.find(cat => cat._id === parentCategoryId)?.subCategories || [];

    const addItem = (setter, item) => {
        setter(prev => [...prev, item]);
    };

    const handleFileChange = (e) => {
        setPhotos(Array.from(e.target.files));
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <ToastContainer />
            <h1 className="text-xl font-bold font-serif text-gray-700 uppercase text-center">Add Package</h1>

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

            {subCategories.length > 0 && (
                <div className="mb-4">
                    <label htmlFor="subCategory" className="block font-semibold mb-2">
                        Subcategory (optional)
                    </label>
                    <select
                        id="subCategory"
                        value={subCategoryId}
                        onChange={handleSubCategoryChange}
                        className="w-full p-2 border rounded focus:outline-none"
                    >
                        <option value="">Select Subcategory</option>
                        {subCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.category}
                            </option>
                        ))}
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
                {whatYouGet.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newWhatYouGet = [...whatYouGet];
                                newWhatYouGet[index] = e.target.value;
                                setWhatYouGet(newWhatYouGet);
                            }}
                            className="w-full p-2 border rounded focus:outline-none"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addItem(setWhatYouGet, "")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    Add What You Get
                </button>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">What Is Theirs</label>
                {whatIsTheir.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newWhatIsTheir = [...whatIsTheir];
                                newWhatIsTheir[index] = e.target.value;
                                setWhatIsTheir(newWhatIsTheir);
                            }}
                            className="w-full p-2 border rounded focus:outline-none"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addItem(setWhatIsTheir, "")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    Add What Is Theirs
                </button>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">What Is Not Theirs</label>
                {whatIsNotTheir.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                                const newWhatIsNotTheir = [...whatIsNotTheir];
                                newWhatIsNotTheir[index] = e.target.value;
                                setWhatIsNotTheir(newWhatIsNotTheir);
                            }}
                            className="w-full p-2 border rounded focus:outline-none"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addItem(setWhatIsNotTheir, "")}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    Add What Is Not Theirs
                </button>
            </div>

            <div className="mb-4">
                <label htmlFor="status" className="block font-semibold mb-2">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="popular" className="inline-flex items-center">
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

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Add Package
            </button>
        </form>
    );
};

export default NewPackageForm;
