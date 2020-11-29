const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  // Blog
  //   .findById(request.params.id)
  //   .then(blog => {
  //     if (blog) {
  //       response.json(blog)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  }  catch(exception){
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  // const blog = new Blog(request.body)
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch(error => next(error))
  const blog = new Blog(request.body);
  try {
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch(exception){
    next(exception);
  }
});

module.exports = blogsRouter;