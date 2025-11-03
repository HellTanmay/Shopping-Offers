const mongoose=require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Path to the uploaded image
  tags: [{ type: String }], // Array of tags
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

