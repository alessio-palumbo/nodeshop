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
        const name = elements.lastName.value

        onAddProduct({ brandName, name })
      }}
    >
      <label className='mb-2'>
        {'Brand name: '}
        <input
          className='form-control'
          type='text'
          name='brandName'
        />
      </label>
      <label className='mb-2'>
        {'Product name: '}
        <input
          className='form-control'
          type='text'
          name='name'
        />
      </label>
      <br />
      <button
        className='btn btn-primary'>Add Product</button>
    </form>
  )
}

export default NewProductForm