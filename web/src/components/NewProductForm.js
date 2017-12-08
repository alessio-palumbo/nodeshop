import React from 'react'

function NewProductForm({
  onAddProduct,
  brandName,
  name
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        // Get entered values from fields
        const brandName = elements.brandName.value
        const name = elements.name.value

        onAddProduct({ brandName, name })
      }}
    >
      <input
        className='form-control product-input'
        type='text'
        name='brandName'
        placeholder='Brand name'
      />
      <input
        className='form-control product-input'
        type='text'
        name='name'
        placeholder='Product name'
      />
      <button
        className='btn btn-primary product-button'
      >
        Add Product
      </button>
    </form>
  )
}

export default NewProductForm