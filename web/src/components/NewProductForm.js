import React from 'react'

function NewProductForm({
  onAddProduct,
  categories
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        const brandName = elements.brandName.value
        const name = elements.name.value
        const category = elements.category.value

        onAddProduct({ brandName, name, category })
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
      <select
        className='form-control product-input product-select'
        name='category'
      >
        {
          categories.map(category => {
            return (
              <option value={category._id}>{category.categoryName}</option>
            )
          })
        }
      </select>
      <button
        className='btn btn-primary product-button'
      >
        Add
      </button>
    </form>
  )
}

export default NewProductForm