const Product = require('./Product')

Product.create([
  {
    brandName: 'Eisonlife',
    name: 'Bluetooth Headphones'
  },
  {
    brandName: 'Yafex',
    name: 'Intelligent Magnetic earphones'
  },
  {
    brandName: 'SDFLAYER',
    name: 'Bluetooth Headphones'
  },
])
  .then(products => {
    console.log('Created products', products)
  })
  .catch(error => {
    console.error(error)
  })