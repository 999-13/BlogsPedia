'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [formData, setFormData] = useState({
    profilePicture: null
  });

  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('profilePicture', formData.profilePicture);

    const token = localStorage.getItem('your_token_key'); // Get token from local storage

    axios.post('http://localhost:3000/api/users/profile-photo-upload', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` // Include the token in the request headers
      }
    })
    .then(response=>{
      console.log('Response : ', response.data);
    })
    .catch(error=>{
      console.log('Error : ', error);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#000000]">Update Profile</h2>
        <div className="flex items-center justify-center mb-8">
          <div 
            className="relative w-32 h-32 rounded-full overflow-hidden"
            onMouseEnter={() => document.getElementById('editProfileButton').style.opacity = 1}
            onMouseLeave={() => document.getElementById('editProfileButton').style.opacity = 0}
          >
            {preview ? (
              <img 
                src={preview} 
                alt="Profile Picture" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span role="img" aria-label="Camera Icon" className="text-gray-500 text-5xl">
                  &#x1F4F7; {/* Unicode character for camera icon */}
                </span>
              </div>
            )}
            <button 
              type="button"
              id="editProfileButton"
              onClick={() => document.getElementById('profilePictureInput').click()}
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-25 text-white hover:text-gray-100 transition-opacity duration-300 focus:outline-none"
              style={{ opacity: 0, transition: 'opacity 0.3s' }}
            >
              Edit Profile
            </button>
            <input 
              type="file" 
              accept="image/*" 
              id="profilePictureInput"
              name="profilePicture" // Correct name attribute
              onChange={handleFileChange} 
              className="hidden"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
