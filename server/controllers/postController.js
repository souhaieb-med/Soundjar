const Post = require("../models/post");

const fetchPosts = async (req, res) => {
  // Find the posts

  const posts = await Post.find();

  // Respond with them

  res.json({ posts });
};

const fetchPost = async (req, res) => {
  // Get id off the url

  const postId = req.params.id;

  //Find the post using that id

  const post = await Post.findById(postId);

  // Respond with it

  res.json({ post });
};

const createPost = async (req, res) => {
  // Get the sent in data off request body

  const { title, body } = req.body;

  // Create a post with it

  const post = await Post.create({
    title,
    body,
  });

  // Respond with the new post

  res.json({ post });
};

const updatePost = async (req, res) => {
  // Get the id of the url

  const postId = req.params.id;

  // Get the data after request body

  const { title, body } = req.body;

  //Find and update the record

  await Post.findByIdAndUpdate(postId, {
    title,
    body,
  });

  //Find updated post

  const post = await Post.findById(postId);

  //Respond with it

  res.json({ post });
};

const deletePost = async (req, res) => {
  //Get the id of the url

  const postId = req.params.id;

  // Delete the record

  await Post.deleteOne({ id: postId });

  //Respond

  res.json({ success: "deleted" });
};

module.exports = {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
};
