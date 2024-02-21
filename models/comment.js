const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

