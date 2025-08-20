import React, { useState } from 'react'

const AddPost = () => {
  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [image,setImage]=useState("")
  const [tag,setTag]=useState("")
  console.log(title, desc, tag)
  return (

    <div className='flex justify-center items-center h-full'>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
    <h2 className="text-2xl font-bold text-center mb-6">Create Post</h2>

    <form className="space-y-4">
    
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input type="text" id="title" name="title" 
          className="w-full border rounded-xl p-2 focus:ring focus:ring-blue-300" 
          placeholder="Enter offer title" onChange={(e)=>setTitle(e.target.value)} required/>
      </div>

    
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea id="description" name="description" rows="3" 
          className="w-full border rounded-xl p-2 focus:ring focus:ring-blue-300"
          placeholder="Enter offer details"  onChange={(e)=>setDesc(e.target.value)} required></textarea>
      </div>

      
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" id="image" name="image" 
          className="w-full border rounded-xl p-2" accept="image/*" required/>
      </div>
       <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
       <select name='tags' multiple onChange={(e)=>setTag((prev)=>[...prev,e.target.value])}>
        <option value={'nature'}>Nature</option>
        <option value={'travel'}>Travel</option>
        <option value={'cities'}>Cities</option>
        <option value={'work'}>Work</option>
       </select>
      </div>
     
      <button type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl shadow">
        Submit
      </button>
    </form>
  </div>
    </div>
    

  )
}

export default AddPost
