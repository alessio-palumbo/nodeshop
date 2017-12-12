import React, { Fragment } from 'react'

function Wishlist({
  wishlistProducts,
  onDeleteWishlistProduct
}) {
  return (
    <Fragment>
      <h4 className='text-center'>Wishlist</h4>
      <hr />
      {
        wishlistProducts.length < 1 ? (
          <p className='text-center'><strong>Your Wishlist is empty</strong></p>
        ) : (
            wishlistProducts.map(product => {
              return (
                <div key={product._id} className='row' >
                  <div className='col-md-3'>
                    {product.brandName}
                  </div>
                  <div className='col-md-5'>
                    {product.name}
                  </div>
                  <div className='col-md-4 text-right'>
                    <button
                      onClick={() => onDeleteWishlistProduct(product._id)}
                      className='btn btn-sm btn-danger'
                    >
                      Unwish
                </button>
                  </div>
                </div>
              )
            })
          )
      }
    </Fragment>
  )
}

export default Wishlist