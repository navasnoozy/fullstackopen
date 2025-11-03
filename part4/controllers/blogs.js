const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog({ ...body, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
  res.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(204).end()
  }
  if (req.user && blog.user.toString() === req.user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    req.user.blogs = req.user.blogs.filter(id => id.toString() !== req.params.id)
    await req.user.save()
    return res.status(204).end()
  } else {
    return res.status(401).json({ error: 'only the creator can delete this blog' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1, id: 1 })
  if (updated) {
    res.json(updated)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter
