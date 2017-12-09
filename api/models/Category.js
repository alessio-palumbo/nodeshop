const mongoose = require('./init')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: String,
  // has many products
  products: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
