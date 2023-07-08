const Post = require('../models/Post');

exports.getPosts = async () => {
  return await Post.find();
};

exports.createPost = async (postData) => {
  const newPost = new Post(postData);
  return await newPost.save();
};

exports.deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

exports.getPostById = async (id) => {
  return await Post.findById(id);
};

exports.updatePost = async (id, updateData) => {
  console.log("in updatePost service")
  const post = await Post.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  post.title = updateData.title || post.title;
  post.content = updateData.content || post.content;
  post.description = updateData.description || post.description;

  return await post.save();
};
