const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

// Read list
router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
    .populate('products')
    .then(wishlist => {
      if (wishlist) {
        res.json({ products: wishlist.products })
      } else {
        // No wishlist created for this user yet, so return empty wishlist
        res.json({ products: [] })
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

// Add product wo wishlist
router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    // Find the wishlist for the signed in user
    { user: req.user },
    // Make these changes
    { $addToSet: { products: productID } },
    // Options when updating
    // upsert: update if exist, insert(create) if not
    { upsert: true, new: true, runValidators: true }
  )
    .populate('products')
    .then(wishlist => {
      res.json({ products: wishlist.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

// Remove product from wishlist
router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    // Find the wishlist for the signed in user
    { user: req.user },
    // Make these changes
    { $pull: { products: productID } },
    // Options when updating
    // upsert: update if exist, insert(create) if not
    { upsert: true, new: true, runValidators: true }
  )
    .populate('products')
    .then(wishlist => {
      res.json({ products: wishlist.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

module.exports = router