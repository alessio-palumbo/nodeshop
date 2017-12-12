import React from 'react'

class CategoryNav extends Component {
  state = {
    active: false
  }

  render() {
    const { categoryName, categories, products, onEditProduct, onDeleteProduct, onAddToWishlist } = this.props

    return (
      <div>
        <button
          onClick={() => this.setState({ active: !this.state.active })}
          className='category-toggler text-primary'
        >
          {categoryName}
        </button>
      </div>
    )
  }
}

// export default CategoryNav


class Category extends Component {
  state = {
    active: false
  }

  render() {

    return (
      <div>
        <button
          onClick={() => this.setState({ active: !this.state.active })}
          className='category-toggler text-primary'
        >
          {categoryName}
        </button>
        {
          this.state.active === false ? (
            null
          ) : (
              <div>
                <hr />
                {
                  products.length > 0 ? (
                    <ProductListing
                      categories={categories}
                      products={products}
                      onEditProduct={(id, attributes) => onEditProduct(id, attributes)}
                      onDeleteProduct={(id) => onDeleteProduct(id)}
                      onAddToWishlist={(id) => onAddToWishlist(id)}
                    />
                  ) : (
                      <p>This category is empty!</p>
                    )
                }
                <hr />
              </div>
            )
        }
      </div>
    )
  }
}