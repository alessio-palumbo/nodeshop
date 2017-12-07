import React, { Component } from 'react';
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductListing from './components/ProductListing'
import NewProductForm from './components/NewProductForm'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts, addProducts } from './api/products'
import { setToken } from './api/init'
import { getDecodedToken } from './api/token'


class App extends Component {
  state = {
    decodeToken: getDecodedToken(), // Restore the previous signed in data
    products: null
  }

  onSignUp = ({ firstName, lastName, email, password }) => {
    console.log('User signed up', { firstName, lastName, email, password })
    signUp({ firstName, lastName, email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then(decodedToken => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onAddProduct = () => {
    addProducts()
      .then(data => {
        this.setState(prevState => {
          const newProducts = [...prevState.products, data]
          return ({
            products: newProducts
          })
        })
      })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App" >
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
              <br />
              <ProductListing products={this.state.products} />
              <NewProductForm onClick={this.onAddProduct} />
              <button
                className='btn btn-primary'
                onClick={this.onSignOut}
              >
                Sign Out
            </button>
            </div>

          ) : (
              <div>
                <SignInForm
                  onSignIn={this.onSignIn}
                />
                <br />
                <SignUpForm
                  onSignUp={this.onSignUp}
                />
              </div>
            )
        }
      </div>
    );
  }

  // When this App first appear on screen
  componentDidMount() {
    listProducts()
      .then(products => {
        this.setState(products)
      })
      .catch(error => {
        console.error('error loading products', error)
      })
  }
}

export default App;
