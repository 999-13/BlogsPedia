'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Editor() {
    const [fontSize, setFontSize] = useState(16);
    const [fontColor, setFontColor] = useState('#000000');
    const [bulletStyle, setBulletStyle] = useState('disc');
    const [showCategories, setShowCategories] = useState(false);
    const contentEditableRef = useRef(null);
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleExecCommand = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleChangeFontSize = (e) => {
        const newSize = parseInt(e.target.value);
        setFontSize(newSize);
        handleExecCommand('fontSize', 7); // Use a placeholder size
        const editable = contentEditableRef.current;
        const traverse = (node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'FONT' && node.size === '7') {
                node.removeAttribute('size');
                node.style.fontSize = `${newSize}px`;
            }
            node.childNodes.forEach(traverse);
        };
        traverse(editable);
    };

    const handleChangeFontColor = (e) => {
        const newColor = e.target.value;
        setFontColor(newColor);
        handleExecCommand('foreColor', newColor);
    };

    const handleBulletStyleChange = (e) => {
        const selectedStyle = e.target.value;
        setBulletStyle(selectedStyle);

        const listStyleType = {
            disc: 'disc',
            circle: 'circle',
            square: 'square',
            decimal: 'decimal',
            'lower-alpha': 'lower-alpha',
            'upper-alpha': 'upper-alpha',
            'lower-roman': 'lower-roman',
            'upper-roman': 'upper-roman',
        };

        handleExecCommand('insertUnorderedList'); // First, create a default unordered list
        const editable = contentEditableRef.current;
        const traverse = (node) => {
            if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'UL' || node.tagName === 'OL')) {
                node.style.listStyleType = listStyleType[selectedStyle];
            }
            node.childNodes.forEach(traverse);
        };
        traverse(editable);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            story,
            categoryId: selectedCategoryId,
        };

        try {
            const response = await axios.post('http://localhost:3000//api/posts', postData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('your_token_key')}`,
                },
            });
            alert('Post created successfully');
            fetchPosts();
        } catch (error) {
            console.error('There was an error creating the post!', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categories', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('your_token_key')}`,
                },
            });
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error.response ? error.response.data : error.message);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/posts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('your_token_key')}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error('There was an error fetching the posts!', error);
        }
    };

    return (
        <>
            <form className="w-3/4 mx-auto pt-18" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="flex flex-row justify-start">
                            <Image
                                src="/ProfileNav/Image.png"
                                alt="User Image"
                                width={48}
                                height={50}
                            />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-[28px] text-[#592EA9] font-bold">Drafts in Guri Guraya</span>
                            <span className="text-[16px] text-[#6D6E76] font-normal">Posted on 27th January 2024</span>
                        </div>
                    </div>
                    <div className="flex justify-end pb-[69px]">
                        <button type="submit" className="w-[156px] h-[47px] bg-[#66899D] text-white rounded-[25px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Publish
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:opacity-75 placeholder:text-[#E7E7E7] placeholder:Roboto placeholder:font-medium placeholder:text-[48px]"
                    />
                </div>
                <div className="mb-6">
                    <div
                        ref={contentEditableRef}
                        contentEditable
                        className="w-full h-80 px-4 py-2 border border-gray-300 rounded-lg shadow resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#E7E7E7] placeholder:Roboto placeholder:font-normal placeholder:text-[36px]"
                        style={{ fontSize: `${fontSize}px`, color: fontColor }}
                        onInput={(e) => setStory(e.target.innerHTML)}
                    ></div>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="w-28 bg-[#66899D] text-white rounded-[25px] py-1 text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={toggleCategories}
                        >
                            {showCategories ? 'Hide Categories' : 'Show Categories'}
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="mr-2 font-bold text-gray-500"
                            onClick={(e) => { e.preventDefault(); handleExecCommand('bold'); }}
                        >
                        // [Continued]
                        </button>
                        <button
                            className="mr-2 italic text-gray-500"
                            onClick={(e) => { e.preventDefault(); handleExecCommand('italic'); }}
                        >
                            I
                        </button>
                        <button
                            className="mr-2 underline text-gray-500"
                            onClick={(e) => { e.preventDefault(); handleExecCommand('underline'); }}
                        >
                            U
                        </button>
                        <input
                            type="number"
                            className="w-20 border rounded-md p-1 mr-2"
                            value={fontSize}
                            onChange={handleChangeFontSize}
                            min="1"
                            max="50"
                        />
                        <input
                            type="color"
                            className="w-8 h-8 border rounded-full mr-2"
                            value={fontColor}
                            onChange={handleChangeFontColor}
                        />
                        <select
                            className="border rounded-md p-1"
                            value={bulletStyle}
                            onChange={handleBulletStyleChange}
                        >
                            <option value="disc">Disc</option>
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="decimal">Decimal</option>
                            <option value="lower-alpha">Lower Alpha</option>
                            <option value="upper-alpha">Upper Alpha</option>
                            <option value="lower-roman">Lower Roman</option>
                            <option value="upper-roman">Upper Roman</option>
                        </select>
                    </div>
                </div>
                {showCategories && (
                    <div className="mt-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
                        <ul>
                            {categories.map(category => (
                                <li key={category._id} className="py-1">
                                    <label>
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category._id}
                                            onChange={() => setSelectedCategoryId(category._id)}
                                        />
                                        {category.title}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </>
    );
}
