const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

// const initialBlogs = [
//   {
//     title: "Cooking classes for dogs",
//     author: "A Journo",
//     url: "wwww.buzzfeed.blog",
//     likes: 2,
//   },
//   {
//     title: "How to buy the perfect summer swimsuit",
//     author: "B Journo",
//     url: "wwww.swim.blog",
//     likes: 1,
//   },
// ];

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned from the test db", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
      "Cooking classes for dogs"
  )
})

test('blog posts have id propety, not _id property', async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map(x => x.id);
  expect(ids[0]).toBeDefined();
  expect(ids[1]).toBeDefined();
})

test('a new a new blog post can be added using HTTP POST', async () => {
  const newBlog = {
    title: "Skateboarding for the over 40s",
    author: "Skate Man",
    url: "wwww.skating.blog",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  // const response = await api.get("/api/blogs");
  // const titles = response.body.map(r => r.title);
  
  // expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  // expect(titles).toContain('Skateboarding for the over 40s');
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(r => r.title);
  expect(titles).toContain('Skateboarding for the over 40s');

})

test('if likes property is missing from post request it will default to 0', async () => {
  const newBlog = {
    title: "Skateboarding for the over 50s",
    author: "Skate Man 2",
    url: "wwww.skating.blog",
  };

  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/);

  // const response = await api.get("/api/blogs");
  // const likes = response.body.map(r => r.likes);

  // expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  // expect(likes[2]).toBeDefined();
  // expect(likes).toContain(0);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const likes = blogsAtEnd.map(r => r.likes);
  expect(likes[2]).toBeDefined();
  expect(likes).toContain(0);
})

test('blog without title and url proprties cannot be added with post request', async () => {
  const newBlog = {
    author: "Serious Journalist",
    likes: 5,
  };

  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(400)

  // const response = await api.get("/api/blogs");

  // expect(response.body).toHaveLength(helper.initialBlogs.length);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(r => r.title);
  expect(titles).not.toContain(blogToDelete.title);

})

afterAll(() => {
  mongoose.connection.close();
});
