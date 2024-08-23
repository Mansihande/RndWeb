import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const SubsectionEditor = ({ subsections, setSubsections }) => {
  const handleSubsectionChange = (index, field, value) => {
    const updatedSubsections = [...subsections];
    updatedSubsections[index][field] = value;
    setSubsections(updatedSubsections);
  };

  const handleAddSubSection = () => {
    setSubsections([...subsections, { title: '', description: '', photo: null, photoAlt: '' }]);
  };

  const handleRemoveSubSection = (index) => {
    const updatedSubsections = [...subsections];
    updatedSubsections.splice(index, 1);
    setSubsections(updatedSubsections);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-bold">Subsections</label>
      {subsections.map((s, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={s.title}
            onChange={(e) => handleSubsectionChange(index, 'title', e.target.value)}
            placeholder="Subsection Title"
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
          <ReactQuill
            value={s.description}
            onChange={(value) => handleSubsectionChange(index, 'description', value)}
            modules={modules}
            className="border border-gray-300 rounded-md mb-2"
          />
          <input
            type="file"
            onChange={(e) => handleSubsectionChange(index, 'photo', e.target.files[0])}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
          <input
            type="text"
            value={s.photoAlt}
            onChange={(e) => handleSubsectionChange(index, 'photoAlt', e.target.value)}
            placeholder="Photo Alt Text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
          <button
            type="button"
            onClick={() => handleRemoveSubSection(index)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSubSection}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
      >
        Add Subsection
      </button>
    </div>
  );
};

export default SubsectionEditor;
