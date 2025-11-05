import React, { useState } from 'react';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null); 
  const [tag, setTag] = useState([]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData for multipart/form-data submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('image', image); 
    formData.append('tags', tag.join(',')); 

    try {
      const response = await fetch('http://localhost:5000/add-post', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Optionally reset form or show success message
        setTitle("");
        setDesc("");
        setImage(null);
        setTag([]);
      } else {
        const error = await response.json();
        console.error('Error:', error);
        // Optionally show error message
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setTag(selectedOptions);
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Post</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              className="w-full border rounded-xl p-2 focus:ring focus:ring-blue-300" 
              placeholder="Enter offer title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows="3" 
              className="w-full border rounded-xl p-2 focus:ring focus:ring-blue-300"
              placeholder="Enter offer details" 
              value={desc}
              onChange={(e) => setDesc(e.target.value)} 
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input 
              type="file" 
              id="image" 
              name="image" 
              className="w-full border rounded-xl p-2" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <select 
              name='tags' 
              multiple 
              value={tag}
              onChange={handleTagChange}
              className="w-full border rounded-xl p-2"
            >
              <option value={'nature'}>Nature</option>
              <option value={'travel'}>Travel</option>
              <option value={'cities'}>Cities</option>
              <option value={'work'}>Work</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl shadow"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
