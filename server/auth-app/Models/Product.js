const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  category: { // Make sure this matches `uploadType` or `fileType` from frontend
    type: String,
    enum: ['beat', 'pack'], // Or whatever your valid categories are
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  coverImage: { // Add this
    type: String, // Store the path/URL
    required: true
  },
  fileUrl: { // Add this for the actual product file
    type: String,
    required: true
  },
  uploadedBy: { // Add this if you're linking to a User/Admin model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Assuming products are uploaded by Admins
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);