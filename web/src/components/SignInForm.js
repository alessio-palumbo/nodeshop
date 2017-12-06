import React from 'react'

function SignInForm({

}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        console.log('Form Submitted')
      }}
    >
      <label className='mb-2'>
        {'Email: '}
        <input
          type='email'
          name='email'
        />
      </label>
      <label className='mb-2'>
        {'Password: '}
        <input
          type='password'
          name='password'
        />
      </label>
      <br />
      <button>Sign in</button>
    </form>
  )
}

export default SignInForm