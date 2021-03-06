const mongoose = require('mongoose');
const Post = require('../models/postModel');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(404);
    throw new Error('Posts not found');
  }
};

const createPost = async (req, res) => {
  const { title, message, creator, tags, selectedFile, likeCount } = req.body;
  const newPost = new Post({
    title,
    message,
    creator,
    tags: tags.split(',').map((item) => item.trim()),
    selectedFile,
    likeCount,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400);
    throw new Error('Err: ', error.message);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const postData = req.body;
  postData.tags = postData.tags.split(',').map((item) => item.trim());

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).json({ message: 'Cannot update: Invalid post id' });

  const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
    new: true,
  });
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).json({ message: 'Cannot delete: Invalid post id' });

  await Post.findByIdAndDelete(postId);
  res.json({ message: 'Deleted!' });
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
