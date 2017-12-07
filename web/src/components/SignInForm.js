import React from 'react'

function SignInForm({
  onSignIn
}) {
  return (
    <form
      onSubmit={(event) => {
        // Prevent browser from 
        event.preventDefault()

        const form = event.target
        // Key-value system using the name attributes
        const elements = form.elements
        // Get entered values from fields
        const email = elements.email.value
        const password = elements.password.value

        // Pass this information along to the parent component
        onSignIn({ email, password })
      }}
    >
      <label className='mb-2'>
        {'Email: '}
        <input
          className='form-control'
          type='email'
          name='email'
        />
      </label>
      <label className='mb-2'>
        {'Password: '}
        <input
          className='form-control'
          type='password'
          name='password'
        />
      </label>
      <br />
      <button className='btn btn-primary'>Sign in</button>
    </form>
  )
}

export default SignInForm