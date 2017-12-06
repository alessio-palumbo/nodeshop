const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Register
router.post('/auth/register',
  /* middleware that handles the registration process */
  authMiddleware.register,
  /* json handler */
  authMiddleware.signJWTForUser
  // (req, res) => {
  //   res.json({
  //     user: req.user
  //   })
)

// Sign In
router.post('/auth',
  /* middleware that handles the sign in */
  authMiddleware.signIn,
  /* json handler */
  authMiddleware.signJWTForUser
  // (req, res) => {
  //   res.json({
  //     user: req.user
  //   })
  // }
)

module.exports = router