import React, { Component } from 'react'
import ProductListing from './ProductListing'

class Category extends Component {
  state = {
    active: false
  }

  render() {
    const { categoryName, categories, products, onEditProduct, onDeleteProduct, onAddToWishlist } = this.props

    return (
      <div>
        {
          <button
            onClick={() => this.setState({ active: !this.state.active })}
            className='category-toggler text-primary'
          >
            {categoryName}
          </button>
        }
        {
          this.state.active === false ? (
            null
          ) : (
              <div>
                <hr />
                <ProductListing
                  categories={categories}
                  products={products}
                  onEditProduct={(id, attributes) => onEditProduct(id, attributes)}
                  onDeleteProduct={(id) => onDeleteProduct(id)}
                  onAddToWishlist={(id) => onAddToWishlist(id)}
                />
                <hr />
              </div>
            )
        }
      </div>
    )
  }
}

export default Category