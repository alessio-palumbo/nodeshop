import React, { Component } from 'react'

class Product extends Component {
  state = {
    editProduct: false
  }
  render() {
    const { brandName, name, onEditValue, onDeleteProduct } = this.props

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
              <div className='col-md-3'>
                <button onClick={() => this.setState({ editProduct: !this.state.editProduct })} className='btn btn-sm btn-success'>Edit</button>
                <button onClick={onDeleteProduct} className='btn btn-sm btn-danger'>delete</button>
              </div>
            </div>
          ) : (
              <div className='row'>
                <div className='col-md-3'>
                  <input onChange={onEditValue} type='text' value={brandName} className='form-control edit-product-input' />
                </div>
                <div className='col-md-6'>
                  <input onChange={onEditValue} type='text' value={name} className='form-control edit-product-input' />
                </div>
                <div className='col-md-3'>
                  <button onClick={() => this.setState({ editProduct: !this.state.editProduct })} className='btn btn-sm btn-success'>Done</button>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}

export default Product