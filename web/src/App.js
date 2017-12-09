import React, { Component } from 'react';
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductListing from './components/ProductListing'
import NewProductForm from './components/NewProductForm'
import Wishlist from './components/Wishlist'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts, addProduct, updateProduct, deleteProduct } from './api/products'
import { showWishlist, addWishlistProduct, deleteWishlistProduct } from './api/wishlist'
import { setToken } from './api/init'
import { getDecodedToken } from './api/token'


class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    products: [],
    wishlistProducts: [],
    showSignUp: false
  }

  // User 

  showSignUp = () => {
    this.setState({ showSignUp: !this.state.showSignUp })
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

  // Products

  onAddProduct = ({ brandName, name }) => {
    addProduct({ brandName, name })
      .then(data => {
        this.setState(prevState => {
          const newProducts = [...prevState.products, data]
          return ({
            products: newProducts
          })
        })
      })
  }

  onEditProduct = (id, attributes) => {
    updateProduct(id, attributes)
      .then(updatedProduct => {
        console.log(updatedProduct)
        this.setState(prevState => {
          const updatedProducts = prevState.products.map(product => {
            if (product._id === updatedProduct._id) {
              return {
                ...updatedProduct
              }
            } else {
              return product
            }
          })

          return ({
            products: updatedProducts,
            wishlistProducts: prevState.wishlistProducts
          })
        })
        showWishlist()
          .then(wishlistProducts => {
            this.setState({ wishlistProducts })
          })
      })

  }

  onDeleteProduct = (id) => {
    deleteProduct(id)
      .then(removedProduct => {
        this.setState(prevState => {
          const updatedProducts = prevState.products.filter(product => {
            if (product._id !== removedProduct._id) {
              return product
            }
          })
          return ({
            products: updatedProducts
          })
        })
      })
  }

  // Wishlist
  onAddToWishlist = (productID) => {
    addWishlistProduct(productID)
      .then(newList => {
        this.setState(prevState => {
          const updatedWishlist = [...newList]
          return ({
            wishlistProducts: updatedWishlist
          })
        })
      })
  }

  onDeleteWishlistProduct = (productID) => {
    deleteWishlistProduct(productID)
      .then(newList => {
        this.setState(prevState => {
          const updatedWishlist = [...newList]
          return ({
            wishlistProducts: updatedWishlist
          })
        })

      })
  }


  render() {
    const { decodedToken, products, wishlistProducts } = this.state

    return (
      <div className="App" >
        <div className='jumbotron text-center'>
          <h1>Yarra</h1>
        </div>
        <div className='text-center'>
          <h4>Now Delivering: </h4>
          <h5>Shipping trillions of new products</h5>
        </div>
        <hr />
        {
          decodedToken ? (
            <div>
              <p className='text-center'>Signed in as: <strong>{decodedToken.email}</strong></p>
              {/* <p>Signed in: {new Date(decodedToken.iat * 1000).toISOString()}</p>
              <p>Expire in: {new Date(decodedToken.exp * 1000).toISOString()}</p> */}
              <br />
              {
                !!products &&
                <ProductListing
                  products={products}
                  onEditProduct={this.onEditProduct}
                  onDeleteProduct={this.onDeleteProduct}
                  onAddToWishlist={this.onAddToWishlist}
                />
              }
              <Wishlist
                wishlistProducts={wishlistProducts}
                onDeleteWishlistProduct={this.onDeleteWishlistProduct}
              />
              <hr />
              <br />
              <p><strong>Add New Product</strong></p>
              <NewProductForm onAddProduct={this.onAddProduct} />
              <hr />
              <button
                className='btn btn-alert'
                onClick={this.onSignOut}
              >
                Sign Out
            </button>
              <br />
            </div>

          ) : (
              <div>
                {
                  this.state.showSignUp === false ? (
                    <div>
                      <SignInForm
                        onSignIn={this.onSignIn}
                      />
                      <br />
                      <p>Don't have an account?</p>
                      <button onClick={this.showSignUp} className='btn btn-primary'>Sign Up</button>
                    </div>
                  ) : (
                      <div>
                        <SignUpForm
                          onSignUp={this.onSignUp}
                        />
                        <br />
                        <button
                          className='btn btn-success'
                          onClick={this.showSignUp}
                        >
                          Back to Sign in
                      </button>
                      </div>
                    )
                }
              </div>
            )
        }
        <br />
      </div >
    );
  }

  load() {
    listProducts()
      .then(products => {
        this.setState({ products })
      })
      .catch(error => {
        console.error('error loading products', error)
      })
    showWishlist()
      .then(wishlistProducts => {
        this.setState({ wishlistProducts })
      })
      .catch(error => {
        console.error('error loading wishlist products', error)
      })
  }

  // When this App first appear on screen
  componentDidMount() {
    this.load()
  }

  componentDidUpdate(prevProps, prevState) {
    // If just signed in, signed up or signed out 
    // then token will have changed
    if (this.state.decodedToken !== prevState.decodedToken) {
      this.load()
    }
  }
}

export default App;
