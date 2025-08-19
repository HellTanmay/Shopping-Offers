import React from 'react'

const AddPost = () => {
  return (

    <div className='flex justify-center '>
      <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
    <h2 class="text-2xl font-bold text-center mb-6">create post</h2>

    <form id="offerForm" class="space-y-4">
    
      <div>
        <label class="block text-sm font-medium mb-1">Title</label>
        <input type="text" id="title" name="title" 
          class="w-full border rounded-xl p-2 focus:ring focus:ring-blue-300" 
          placeholder="Enter offer title" required/>
      </div>

    
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea id="description" name="description" rows="3" 
          class="w-full border rounded-xl p-2 focus:ring focus:ring-blue-300"
          placeholder="Enter offer details" required></textarea>
      </div>

      
      <div>
        <label class="block text-sm font-medium mb-1">Image</label>
        <input type="file" id="image" name="image" 
          class="w-full border rounded-xl p-2" accept="image/*" required/>
      </div>

     
      <button type="submit" 
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl shadow">
        Submit
      </button>
    </form>
  </div>
    </div>
    

  )
}

export default AddPost
