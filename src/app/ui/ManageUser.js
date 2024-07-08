'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('your_token_key'); // Get token from local storage
  const adminDetails = JSON.parse(localStorage.getItem('details')); // Get admin details from local storage

  useEffect(() => {
    // Fetch all users from the backend
    axios.get('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      // Log response to verify its structure
      console.log(response.data);

      // Check if response.data.data is an array
      if (Array.isArray(response.data.data)) {
        // Filter out the logged-in admin's details from the users list
        const filteredUsers = response.data.data.filter(user => user.email !== adminDetails.email);
        setUsers(filteredUsers);
      } else {
        setError(new Error('Unexpected response format'));
      }
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }, [token, adminDetails.email]);

  const handleBlock = (id) => {
    axios.get(`http://localhost:3000/api/users/admin-block/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setUsers(users.map(user => 
        user._id === id ? { ...user, isBlocked: true } : user
      ));
    })
    .catch(error => setError(error));
  };

  const handleUnblock = (id) => {
    axios.get(`http://localhost:3000/api/users/admin-unblock/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setUsers(users.map(user => 
        user._id === id ? { ...user, isBlocked: false } : user
      ));
    })
    .catch(error => setError(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setUsers(users.filter(user => user._id !== id));
    })
    .catch(error => setError(error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Log users to verify it's an array
  console.log(users);

  return (
    <div className="min-h-screen bg-gray-100 py-10 text-[#000000]">
      <h1 className="text-2xl font-bold text-center mb-6">User Table</h1>
      <div className="container mx-auto px-4 py-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-200">Name</th>
              <th className="py-2 px-4 border border-gray-200">Image</th>
              <th className="py-2 px-4 border border-gray-200">Email</th>
              <th className="py-2 px-4 border border-gray-200">Blocked Status</th>
              <th className="py-2 px-4 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border border-gray-200">{user.firstname} {user.lastname}</td>
                <td className="py-2 px-4 border border-gray-200">
                  <Image 
                    src={user.image || '/default-avatar.png'} 
                    alt={user.firstname} 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full" 
                  />
                </td>
                <td className="py-2 px-4 border border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border border-gray-200">
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    {user.isBlocked ? (
                      <button
                        className="w-20 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        onClick={() => handleUnblock(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="w-20 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleBlock(user._id)}
                      >
                        Block
                      </button>
                    )}
                    <div className="border-r border-gray-300 h-6"></div>
                    <button
                      className="w-20 bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}