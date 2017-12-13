import React from 'react'
import Product from './Product'

function ProductListing({
  categories,
  products,
  onEditProduct,
  onDeleteProduct,
  onAddToWishlist,
  signedIn
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
              key={index}
              signedIn={signedIn}
              categories={categories}
              onEditProduct={(attributes) => onEditProduct(product._id, attributes)}
              onDeleteProduct={() => onDeleteProduct(product._id)}
              onAddToWishlist={() => onAddToWishlist(product._id)}
            />
          )
        })
      }
    </div>
  )
}

export default ProductListing