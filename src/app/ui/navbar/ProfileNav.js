'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileNav() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('your_token_key');
        localStorage.removeItem('details');
        setUser(null);
        window.dispatchEvent(new Event('storage'));
        router.push('/'); // Redirect to the home page or login page
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('details'));
        if (storedData) {
            setUser(storedData);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="flex pt-[32px] pl-[121px] pr-[101px] w-full items-center justify-between">
                <div className="flex">
                    <div className="flex items-center">
                        <img
                            src="/Social media Signup/Union.png"
                            alt="Social media login"
                            className="w-[36px] h-[36px] mr-2"
                        />
                        <span className="text-[20px] text-[#000000] font-semibold mr-[69px]">Blogspedia</span>
                    </div>
                </div>
                <div className='flex flex-row items-center'>
                    <div>
                        <Link href="/Editor" className="flex items-center text-[14px] font-semibold ml-[30px]">
                            <Image
                                src="/ProfileNav/jam_write-f.jpg"
                                alt="Write"
                                width={20}
                                height={20}
                            />
                            <span className="ml-2 text-[#000000]">Write</span>
                        </Link>
                    </div>
                    <div className='flex items-center ml-[30px] relative' ref={dropdownRef}>
                        <Image
                            src="/ProfileNav/Ellipse.png"
                            alt="Profile_Avatar"
                            width={29}
                            height={29}
                            className="rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />

                        {dropdownOpen && (
                            <div className="absolute right-0 z-20 mt-[120px] w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <Link href="/UserProfile">
                                    <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</span>
                                </Link>
                                {user?.role === 'admin' && (
                                    <>
                                        <Link href="/ManageUser">
                                            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Manage user</span>
                                        </Link>
                                        <Link href="/Category">
                                            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Category</span>
                                        </Link>
                                    </>
                                )}
                                <Link href="/">
                                    <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Blogs</span>
                                </Link>
                                <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                                    LogOut
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
