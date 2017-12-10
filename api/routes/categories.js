const express = require('express')
const Category = require('../models/Category')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// List categories
router.get('/categories', requireJWT, (req, res) => {
  Category.find()
    .populate('products')
    .then(categories => {
      res.json({ categories })
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

// Show category
router.get('/categories/:categoryName', requireJWT, (req, res) => {
  const categoryName = req.params.categoryName.toString()
  Category.findOne({ categoryName: categoryName })
    .populate('products')
    .then(category => {
      res.json({ products: category.products })
    })
    .catch(error => {
      res.status(500).json({ error: `A category with a name of '${categoryName}' has not been found` })
    })
})

// Add category
router.post('/categories', requireJWT, (req, res) => {
  const name = req.body
  Category.create(name)
    .then(category => {
      res.json(category)
    })
    .catch(error => {
      res.status(404).json({ error: error })
    })
})

// Update Category
router.patch('/categories/:id', requireJWT, (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Category.findByIdAndUpdate(id, attributes, { new: true })
    .then(category => {
      if (category) {
        res.status(200).json(category)
      } else {
        res.status(404).json({ error: `Category with id ${id} not found` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// Delete category
router.delete('/categories/:id', requireJWT, (req, res) => {
  const id = req.params.id
  Category.findByIdAndRemove(id)
    .then(category => {
      if (category) {
        res.status(200).json(category)
      } else {
        res.status(404).json({ error: `Product with id ${id} not found` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})


module.exports = router