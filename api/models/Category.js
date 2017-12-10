const mongoose = require('./init')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryName: { type: String, unique: true },
  // has many products
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
