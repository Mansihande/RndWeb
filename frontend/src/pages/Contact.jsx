import React, { useState } from 'react';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'you@mail.com',
    phone: '123-555-55555',
    companySize: '1-250',
    activeUsers: '<100k+',
    topic: 'I want to change my plan',
    message: 'Let us know how we can help'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white p-8 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-8">
          <h1 className="text-4xl font-bold text-green-900 mb-6">Rnd.</h1>
          <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Company Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Size</label>
              <div className="flex space-x-2 ">
                {['1-250', '251-1000', '1000+'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, companySize: size })}
                    className={`px-4 py-2 rounded ${formData.companySize === size ? 'bg-red-200' : 'bg-gray-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Active Users</label>
              <div className="flex space-x-2">
                {['<100k+', '>100k', 'Unknown'].map((users) => (
                  <button
                    key={users}
                    type="button"
                    onClick={() => setFormData({ ...formData, activeUsers: users })}
                    className={`px-4 py-2 rounded ${formData.activeUsers === users ? 'bg-red-200' : 'bg-gray-100'}`}
                  >
                    {users}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Topic</label>
              <select name="topic" value={formData.topic} onChange={handleChange} className="w-full p-2 bg-gray-100 rounded">
                <option>I want to change my plan</option>
                <option>Pricing question</option>
                <option>Product question</option>
                <option>Free Demo</option>

                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">How can we help</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="text-sm">
              By clicking "Submit" I agree to the <a href="#" className="text-blue-600">Terms of Use</a> and the <a href="#" className="text-blue-600">Privacy Statement</a>
            </div>
            <div className="flex items-center space-x-4">
              <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded">Submit</button>
              <a href="#" className="text-orange-500">Looking for support? →</a>
            </div>
          </form>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="bg-green-900 rounded-lg p-8 h-full flex items-center justify-center">
            {/* You can add the hand illustration here */}
            <div className="text-white text-6xl">👐</div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm text-green-900">
        © 2023 Kolm design. All rights reserved
      </div>
      <div className="mt-4 bg-yellow-100 p-4 rounded">
        We noticed you're visiting from India. We've updated our prices to Indian rupee for your shopping convenience. <a href="#" className="text-blue-600">Use Euro instead</a>. <a href="#" className="text-blue-600">Dismiss</a>
      </div>
    </div>
  );
};

export default GetInTouch;