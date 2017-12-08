const express = require('express')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.get('/products', authMiddleware.requireJWT, (req, res) => {
  Product.find()
    .then(products => {
      res.json({ products })
    })
    .catch(error => {
      res.json({ error })
    })
})

router.post('/products', authMiddleware.requireJWT, (req, res) => {
  const attributes = req.body
  Product.create(attributes)
    .then(product => {
      res.status(201).json(product)
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
})

router.patch('./products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Product.findByIdAndUpdate(id, attributes, { new: true })
    .then(product => {
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

router.patch('./products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  Product.findByIdAndRemove(id)
    .then(product => {
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