const express = require('express')
const Product = require('../models/Product')
const Category = require('../models/Category')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// index
router.get('/products', (req, res) => {
  Product.find()
    .then(products => {
      res.json({ products })
    })
    .catch(error => {
      res.json({ error })
    })
})

// show
router.get('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then(product => {
      res.json({ product })
    })
    .catch(error => {
      res.json({ error })
    })
})

// create
router.post('/products', authMiddleware.requireJWT, (req, res) => {
  const attributes = req.body
  Product.create(attributes)
    .then(product => {
      Category.findOneAndUpdate(
        { _id: product.category },
        { $addToSet: { products: product._id } },
        { upsert: true, new: true, runValidators: true }
      )
        .populate('products')
        .then(category => {
          res.status(201).json(category)
        })
        .catch(error => {
          res.status(400).json({ error: error })
        })
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// update
router.patch('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Product.findByIdAndUpdate(id, attributes, { new: true })
    .then(product => {
      // // If the category has been changed
      // // TODO add if statement to run category changed only if category has been changed
      // // Remove Product from previous category
      Category.findOneAndUpdate(
        { products: product._id },
        { $pull: { products: product._id } },
        { upsert: true, new: true, runValidators: true }
      )
        .then(category => {
          console.log(`Item successfully removed from ${category.categoryName}`)
        })
      // Update Category if category changed
      Category.findOneAndUpdate(
        { _id: product.category },
        { $addToSet: { products: product._id } },
        { upsert: true, new: true, runValidators: true }
      )
        .then(category => {
          console.log(`Category changed to ${category.categoryName}`)
        })
      if (product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({ error: `Product with id ${id} not found` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

// delete
router.delete('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  Product.findByIdAndRemove(id)
    .then(product => {
      // // Remove product from category
      // Category.findOneAndUpdate(
      //   { _id: product.category },
      //   { $pull: { products: product._id } },
      //   { upsert: true, new: true, runValidators: true }
      // )
      //   .then(category => {
      //     console.log(`Item successfully removed from ${category.categoryName}`)
      //   })

      if (product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({ error: `Product with id ${id} not found` })
      }
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

module.exports = router