'use client'
import axios from 'axios'
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BlogsContent() {


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/all')
            .then(response => {
                setBlogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log(blogs.data)
    return (

        <div className="px-4 mx-auto max-w-[1199px]">

            {blogs.data.map((blog, index) => (
                <div key={index} className="flex flex-col lg:flex-row justify-center py-5 lg:w-[1199px] w-full h-auto lg:h-[283px] mb-[48px] font-Roboto">
                    <div className='flex justify-center lg:justify-start'>
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            width={373}
                            height={263}
                            className="w-full lg:w-[373px] h-auto lg:h-[263px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col mt-4 lg:mt-0 lg:ml-[57px] w-full lg:w-[769px] h-auto lg:h-[283px]">
                        <div className="font-medium text-[24px] lg:text-[42px] pb-[15px] lg:pb-[29px]">{blog.title}</div>
                        <div className="flex items-center">
                            {/* <Image
                                src={blog.user.avtar}
                                alt="User Avatar"
                                width={40}
                                height={40}
                            /> */}
                            {blog.author && (
                                <span className='ml-2 lg:ml-4 font-normal text-[16px] lg:text-[24px]'>{blog.author.firstname} {blog.author.lastname}</span>
                            )}

                            <span className='font-normal text-[14px] lg:text-[18px] ml-4 lg:ml-[20px] text-[#6C757D]'>{blog.createdAt}</span>
                        </div>
                        <div className="flex pt-[15px] lg:pt-[25px] font-normal text-[14px] lg:text-[20px] text-[#6C757D] line-clamp-2">{blog.description}</div>
                        <div className='flex flex-row items-center pt-[20px] lg:pt-[29px]'>
                            <div className='flex flex-row items-center justify-between pt-[20px] lg:pt-[29px]'>
                                <div>
                                    <Link
                                        href={`/${blog._id}`}
                                        className="text-[14px] font-normal"
                                    >
                                        <span className='text-[#121416] font-medium text-[18px] lg:text-[24px] underline'>View Post</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='pl-[20px] lg:pl-[359px] flex items-center'>
                                <span className='mr-[15px] lg:mr-[21px]'>
                                    <Image
                                        src="/ProfileNav/vector.jpg"
                                        alt=""
                                        width={22}
                                        height={20}
                                    />
                                </span>
                                <span className='mr-[15px] lg:mr-[21px]'>
                                    <Image
                                        src="/ProfileNav/mdi_like-outline.jpg"
                                        alt=""
                                        width={22}
                                        height={20}
                                    />
                                </span>
                                <span>
                                    <Image
                                        src="/ProfileNav/comment-outlined.jpg"
                                        alt=""
                                        width={22}
                                        height={20}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
