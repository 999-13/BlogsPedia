'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [isEditing, setIsEditing] = useState(null); // Store the ID of the category being edited
    const [editCategory, setEditCategory] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [authToken, setAuthToken] = useState(null); // Store the auth token

    useEffect(() => {
        checkAdminRole();
    }, []);

    useEffect(() => {
        if (isAdmin && authToken) {
            fetchCategories();
        }
    }, [isAdmin, authToken]);

    const checkAdminRole = () => {
        const userDetails = localStorage.getItem('details');
        const userToken = localStorage.getItem('your_token_key');
        console.log('User details from localStorage:', userDetails); // Log userDetails for debugging
    
        if (userDetails) {
            const parsedDetails = JSON.parse(userDetails);
            console.log('Parsed user details:', parsedDetails); // Log parsedDetails for debugging
    
            // Check if token is present
            if (userToken) { // Adjust this to match your token key name
                setAuthToken(userToken); // Set the auth token
                console.log('Auth token retrieved:', userToken); // Log the token for verification
                // Verify token format
                if (!isValidJWT(userToken)) {
                    console.error('Invalid JWT format');
                }
            } else {
                console.error('No auth token found in user details'); // Log if token is missing
            }
    
            // Check admin role
            if (parsedDetails.role === 'admin') {
                setIsAdmin(true);
            }
        } else {
            console.error('No user details found in localStorage'); // Log if user details are missing
        }
    };
    
    
    // const checkAdminRole = () => {
    //     const userDetails = localStorage.getItem('details');
    //     console.log('User details from localStorage:', userDetails); // Add this log for debugging
    //     // Rest of your code for handling userDetails
    // };
    
    

    const isValidJWT = (token) => {
        const parts = token.split('.');
        return parts.length === 3;
    };

    const fetchCategories = async () => {
        if (!authToken || !isValidJWT(authToken)) {
            console.error('Invalid or missing auth token, cannot fetch categories');
            return;
        }
        try {
            const response = await axios.get('http://localhost:3000/api/categories', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log("Categories fetched:", response.data); // Verify the response data in the console
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error.response ? error.response.data : error.message);
        }
    };

    const handleCreate = async () => {
        if (!authToken || !isValidJWT(authToken)) {
            console.error('Invalid or missing auth token, cannot create category');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/categories', 
                { title: newCategory },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log('Category created:', response.data); // Verify the response data in the console
            setNewCategory('');
            fetchCategories();
        } catch (error) {
            console.error('Error creating category:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!authToken || !isValidJWT(authToken)) {
            console.error('Invalid or missing auth token, cannot delete category');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:3000/api/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Category deleted:', response.data); // Verify the response data in the console
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (category) => {
        setIsEditing(category._id);
        setEditCategory(category.title);
    };

    const handleSaveEdit = async () => {
        if (!authToken || !isValidJWT(authToken)) {
            console.error('Invalid or missing auth token, cannot save category');
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3000/api/categories/${isEditing}`, 
                { title: editCategory },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log('Category edited:', response.data); // Verify the response data in the console
            setIsEditing(null);
            setEditCategory('');
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error.response ? error.response.data : error.message);
        }
    };

    if (!isAdmin) {
        return (
            <div className="p-4 min-h-screen flex flex-col items-center text-[#000000] pt-[50px]">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p>You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="p-4 min-h-screen flex flex-col items-center text-[#000000] pt-[50px]">
            <div className="w-full max-w-3xl mb-4 flex justify-between">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                    Create
                </button>
            </div>

            <div className="w-full max-w-3xl bg-white shadow-md rounded-md">
                <ul>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <li key={category._id} className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                                {isEditing === category._id ? (
                                    <input
                                        type="text"
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                    />
                                ) : (
                                    <span>{category.title}</span>
                                )}
                                <div className="flex space-x-2">
                                    {isEditing === category._id ? (
                                        <button
                                            onClick={handleSaveEdit}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2">No categories available</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
