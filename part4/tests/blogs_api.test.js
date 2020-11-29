const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Cooking classes for dogs",
    author: "A Journo",
    url: "wwww.buzzfeed.blog",
    likes: 0,
  },
  {
    title: "How to buy the perfect summer swimsuit",
    author: "B Journo",
    url: "wwww.swim.blog",
    likes: 1,
  },
];

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
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

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
      "Cooking classes for dogs"
  )
})

afterAll(() => {
  mongoose.connection.close();
});
