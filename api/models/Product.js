const mongoose = require('./init')
const Schema = mongoose.Schema

const productSchema = new Schema({
  // belongs to one category
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  brandName: String,
  name: String
})

productSchema.post('remove', next => {
  Category.findByIdAndUpdate(
    { _id: this.category },
    { $pull: { products: this._id } },
    { upsert: true, new: true, runValidators: true }
  )
  // Category.findById(this.category)
  //   .then(category => {
  //     category.remove({ products: this._id })
  //   })
})

productSchema.pre('update', next => {
  Category.findByIdAndUpdate(
    { _id: this.category },
    { $pull: { products: this._id } },
    { upsert: true, new: true, runValidators: true }
  )
})

productSchema.post('update', next => {
  Category.findByIdAndUpdate(
    { _id: this.category },
    { $addToSet: { products: this._id } },
    { upsert: true, new: true, runValidators: true }
  )
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product