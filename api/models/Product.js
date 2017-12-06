const mongoose = require('./init')

const Product = mongoose.model('Product', {
  brandName: String,
  name: String
})

module.exports = Product