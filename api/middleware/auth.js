const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const User = require('../models/User')

const jwtSecret = 'ikefY93dFV1smrKe9RY0xoO4RjzcwbVTYFux20RDOuD0O1sdTBLCB3sBqe0fT6FO'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }
    // Store user so we can access it in out handler
    req.user = user
    // Success!
    next()
  })
}

passport.use(new PassportJwt.Strategy({
  // Where will the JWT be passed in the HTTP request?
  // Authorization: Bearer eyJh...
  jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // What is the secret
  secretOrKey: jwtSecret,
  // What algorithm(s) was used to sign it?
  algorithms: [jwtAlgorithm]
},
  // When we have a verified token
  (payload, done) => {
    // Find the real user from our database using the 'id' in the JWT
    User.findById(payload.sub)
      .then(user => {
        // If user was found with this id
        if (user) {
          done(null, user)
          // If user was not found
        } else {
          done(null, false)
        }
      })
      .catch(error => {
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user
  // Create a signed token
  const token = JWT.sign(
    {
      // Payload
      email: user.email
    },
    // Secret
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Send the token
  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}