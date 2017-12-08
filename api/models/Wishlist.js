const mongoose = require('./init')
const Schema = mongoose.Schema

// t.references :owner, foreign_key: { to_table: :users}

const wishlistSchema = new Schema({ // one to many relationship
  // belongs to user
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // has many products
  products: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist