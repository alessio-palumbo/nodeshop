import React, { Component } from 'react';
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'
import { listProducts } from './api/products'
import { setToken } from './api/init'

class App extends Component {
  state = {
    decodeToken: null
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        <div className='jumbotron'>
          <h1 className='text-center'>Yarra</h1>
          <h4>Now Delivering: Shipping trillions of new products</h4>
        </div>
        {
          decodedToken ? (
            <div>
              <p>Email: {decodedToken.email}</p>
              <p>Signed in: {new Date(decodedToken.iat * 1000).toISOString()}</p>
              <p>Expire in: {new Date(decodedToken.exp * 1000).toISOString()}</p>
            </div>

          ) : (
              <SignInForm
                onSignIn={this.onSignIn}
              />
            )
        }
      </div>
    );
  }

  // When this App first appear on screen
  componentDidMount() {
    listProducts()
      .then(products => {
        console.log(products)
      })
      .catch(error => {
        console.error('error loading products', error)
      })
  }
}

export default App;
