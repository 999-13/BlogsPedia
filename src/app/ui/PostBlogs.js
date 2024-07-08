"use client"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import RelatedBlogs from "@/app/ui/RelatedBlogs";

export default function PublicBlogs({ id }) {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('your_token_key'); // Assuming token in local storage
        // Make sure the API endpoint is correct and reachable
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` } // Include token in Authorization header
        });
        setBlog(response.data); // Check the structure of the response.data
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Error fetching blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Check if loading state is handled correctly
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if error state is handled correctly
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if blog state is handled correctly
  if (!blog) {
    return <div>No blog found for ID: {id}</div>;
  }
  console.log(blog)
  return (
    <div className="pl-[90px]">
      <div>
        <h1 className=" text-6xl font-semibold flex pl-[115px] mt-[45px]">
           {blog.title}
        </h1>
        <div className="pt-[50px] flex justify-center">
          {/* Check if the path to the image is correct */}
          <Image src={blog.image} width={1199} height={582} />
        </div>
          <p className=" text-6xl font-semibold flex pl-[35px]">
          {blog.description}
          </p>
          <p className="mt-[45px] pl-[20px]">
          </p>
        <div>
          <p className="mt-[115px]">
            {/* Ensure other static text content is displayed correctly */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
            At risus viverra adipiscing at in tellus. Sociis natoque penatibus
            et magnis dis parturient montes. Ridiculus mus mauris vitae
            ultricies leo. Neque egestas congue quisque egestas diam. Risus in
            hendrerit gravida rutrum quisque non.
          </p>
        </div>
        {/* Ensure RelatedBlogs component is correctly imported and rendered */}
        <RelatedBlogs />
      </div>
    </div>
  );
}