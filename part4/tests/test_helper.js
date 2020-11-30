const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Cooking classes for dogs",
    author: "A Journo",
    url: "wwww.buzzfeed.blog",
    likes: 2,
  },
  {
    title: "How to buy the perfect summer swimsuit",
    author: "B Journo",
    url: "wwww.swim.blog",
    likes: 1,
  },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}