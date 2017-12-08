import React from 'react'

function Wishlist({
  wishlistProducts,
  onDeleteWishlistProduct
}) {
  return (
    <div>
      <hr />
      <h4 className='text-center'>Wishlist</h4>
      <hr />
      {
        wishlistProducts.map(product => {
          return (
            <div key={product._id} className='row'>
              <div className='col-md-3'>
                {product.brandName}
              </div>
              <div className='col-md-5'>
                {product.name}
              </div>
              <div className='col-md-4 text-right'>
                <button
                  onClick={onDeleteWishlistProduct}
                  className='btn btn-sm btn-danger'
                >
                  Delete from Wishlist
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Wishlist