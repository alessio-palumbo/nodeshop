import React from 'react'
import Product from './Product'

function ProductListing({
  products,
  onEditProduct,
  onDeleteProduct
}) {
  return (
    <div>
      <div className='row'>
        <div className='col-md-3'><strong>Brand name</strong></div>
        <div className='col-md-6'><strong>Name</strong></div>
      </div>
      <hr />
      {
        products.map((product, index) => {
          return (
            <Product
              {...product}
              onEditProduct={() => onEditProduct(product._id)}
            />
          )
        })
      }
    </div>
  )
}

export default ProductListing