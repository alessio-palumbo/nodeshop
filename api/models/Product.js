const mongoose = require('./init')
const Schema = mongoose.Schema

const productSchema = new Schema({
  brandName: String,
  name: String,
  // belongs to one category
  category: { type: Schema.ObjectId, ref: 'Category' }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product