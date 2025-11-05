import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const GetPostData = () => {
  const { postid } = useParams(); // Get postid from URL (should be MongoDB _id)
  const [post, setPost] = useState(null); // State for the fetched post
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch post from backend on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${postid}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Post not found');
          }
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        
        // Map MongoDB data to match your UI structure
        const mappedPost = {
          id: data._id,
          title: data.title,
          description: data.description,
          img: `http://localhost:5000/${data.image}`, // Full URL for image
          tag: data.tags.length > 0 ? data.tags[0] : 'Uncategorized', 
          date: new Date(data.createdAt).toLocaleDateString(), // Format createdAt as date string
        };
        
        setPost(mappedPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postid) {
      fetchPost();
    }
  }, [postid]); // Re-fetch if postid changes

  // Loading and error handling
  if (loading) {
    return <div className="flex flex-col items-center h-full p-10 text-center">Loading post...</div>;
  }

  if (error) {
    return <div className="flex flex-col items-center h-full p-10 text-center text-red-500">Error: {error}</div>;
  }

  if (!post) {
    return <div className="flex flex-col items-center h-full p-10 text-center text-gray-500">Post not found.</div>;
  }

  return (
    <div className='flex flex-col items-center h-full p-10'>
      <h1 className='text-center font-bold text-4xl p-2 font-mono'>{post.title}</h1>
      <img src={post.img} alt={post.title} width={700} className="mt-4" />
      <p className='text-2xl font-serif mt-3 max-w-4xl text-center'>{post.description}</p>
      {/* Optional: Display additional info like tag and date */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Tag: {post.tag}</p>
        <p className="text-sm text-gray-500">Posted on: {post.date}</p>
      </div>
    </div>
  );
};

export default GetPostData;