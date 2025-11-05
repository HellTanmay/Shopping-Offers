const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const Post= require('./models/PostSchema')
const app = express();
const PORT = 5000; // Or any port you prefer

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images statically

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Infogram', { // Replace with your MongoDB URI (e.g., for Atlas: 'mongodb+srv://...')
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));





// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to uploads/ folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// POST Route to Add Post
app.post('/add-post', upload.single('image'), async (req, res) => {
    console.log(req.body)
  try {
    const { title, description, tags } = req.body;
    
    // Validate required fields
    if (!title || !description || !req.file) {
      return res.status(400).json({ error: 'Title, description, and image are required.' });
    }

    // Parse tags (assuming they come as a JSON string or comma-separated; adjust based on frontend)
    let parsedTags = [];
    if (tags) {
      if (typeof tags === 'string') {
        parsedTags = tags.split(',').map(tag => tag.trim()); // If sent as comma-separated string
      } else if (Array.isArray(tags)) {
        parsedTags = tags;
      }
    }

    // Create new post
    const newPost = await Post.insertOne({ 
        title,
        description,
        image: req.file.path, // Save the file path
        tags: parsedTags
    })
    

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// ... (your existing code)

// GET Route to Fetch a Single Post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id); // Fetch post by _id
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// ... (rest of your server code) 
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});