"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function BlogsContent() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/all")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Customize the format as needed
  };

  return (
    <>
      <span className="text-[38px] text-[#000000] font-bold pl-[128px] mb-[29px]"> What to read next?</span>
      <div className="flex  flex-row w-full mt-[29px] space-x-[81px] text-[#000000] pl-[86px] text-Roboto overflow-x-auto">
        {blogs.data.map((blog, index) => (
          <div key={index} className="pr-[81px] w-[344px] ">
            <div className="w-[344px] h-[318px]">
              <Image src={blog.image} alt={blog.title} width={344} height={318} />
            </div>
            <div className="text-lg">
              <div className="font-bold leading-10 line-clamp-1">
                {blog.title}
              </div>

              <div className="">{formatDate(blog.createdAt)}</div>

              <div className="leading-7 font-normal text-base line-clamp-2 h-[50px]">
                {blog.description}
              </div>
              <div>
                <Link href="/Posts" className="">
                  <span className="text-[#121416] font-medium text-[18px] lg:text-[24px] underline">
                    View Post
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
