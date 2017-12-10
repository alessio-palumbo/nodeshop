const mongoose = require('./init')
const Schema = mongoose.Schema

const productSchema = new Schema({
  // belongs to one category
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  brandName: String,
  name: String
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product