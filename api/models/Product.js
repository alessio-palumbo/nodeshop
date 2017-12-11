const mongoose = require('./init')
const Schema = mongoose.Schema

const productSchema = new Schema({
  // belongs to one category
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  brandName: String,
  name: String
})

productSchema.pre('remove', next => {
  Category.findById(this.category)
    .then(category => {
      category.remove({ products: this._id })
    })
})

productSchema.pre('update', next => {
  Category.findById(this.category)
    .then(category => {
      category.remove({ products: this._id })
    })
})

productSchema.post('update', next => {
  Category.findById(this.category)
    .then(category => {
      category.update({ products: this._id })
    })
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product