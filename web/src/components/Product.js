import React, { Component } from 'react'

class Product extends Component {
  state = {
    editProduct: false
  }
  render() {
    const { brandName, name, onEditProduct, onDeleteProduct, onAddToWishlist } = this.props

    return (
      <div>
        {
          this.state.editProduct === false ? (
            <div className='row'>
              <div className='col-md-3'>
                {brandName}
              </div>
              <div className='col-md-6'>
                {name}
              </div>
              <div className='col-md-3 text-right'>
                <button
                  onClick={() => this.setState({ editProduct: !this.state.editProduct })}
                  className='btn btn-sm btn-success'
                >Edit</button>
                <button
                  onClick={onAddToWishlist}
                  className='btn btn-sm btn-primary'
                >
                  <span className='emoji' role='img' aria-label='add to wishlist'>❤️</span>
                </button>
                <button
                  onClick={onDeleteProduct}
                  className='btn btn-sm btn-danger'
                >
                  <span className='emoji' role='img' aria-label='delete product'>✖️</span>
                </button>
              </div>
            </div>
          ) : (
              <form
                onSubmit={event => {
                  event.preventDefault()

                  const form = event.target
                  const elements = form.elements
                  const brandName = elements.brandName.value
                  const name = elements.name.value

                  onEditProduct({ brandName, name })
                  this.setState({ editProduct: !this.state.editProduct })

                }}
              >
                <div className='row'>
                  <div className='col-md-3'>
                    <input
                      type='text'
                      name='brandName'
                      defaultValue={brandName}
                      className='form-control edit-product-input'
                    />
                  </div>
                  <div className='col-md-6'>
                    <input
                      type='text'
                      name='name'
                      defaultValue={name}
                      className='form-control edit-product-input'
                    />
                  </div>
                  <div className='col-md-3 text-right'>
                    <button
                      className='btn btn-sm btn-primary btn-update'
                    >
                      Update
                  </button>
                    <button
                      onClick={
                        (event) => {
                          event.preventDefault()
                          this.setState({ editProduct: !this.state.editProduct })
                        }}
                      className='btn btn-sm btn-success'
                    >
                      Back
                  </button>
                  </div>
                </div>
              </form>
            )
        }
      </div>
    )
  }
}

export default Product