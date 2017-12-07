import React from 'react'

function ProductListing({
  products
}) {
  return (
    <div>
      {
        products.map((product, index) => {
          return (
            <dl key={index}>
              <dt>{product.brandName}</dt>
              <dd>{product.name}</dd>
            </dl>
          )
        })
      }
    </div>
  )
}

export default ProductListing