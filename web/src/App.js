import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Error from './components/Error'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ProductListing from './components/ProductListing'
import NewProductForm from './components/NewProductForm'
import Wishlist from './components/Wishlist'
import Category from './components/Category'
import PrimaryNav from './components/PrimaryNav'
import { signUp, signIn, signOutNow } from './api/auth'
import { listProducts, addProduct, updateProduct, deleteProduct } from './api/products'
import { showWishlist, addWishlistProduct, deleteWishlistProduct } from './api/wishlist'
import { listCategories, addCategory, updateCategory, deleteCategory } from './api/categories'
import { setToken } from './api/init'
import { getDecodedToken } from './api/token'


class App extends Component {
  state = {
    error: null,
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    categories: [],
    products: [],
    wishlistProducts: []
  }

  // User 

  showSignUp = () => {
    this.setState({ showSignUp: !this.state.showSignUp })
  }

  onSignUp = ({ firstName, lastName, email, password }) => {
    signUp({ firstName, lastName, email, password })
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  // Products

  onAddProduct = ({ brandName, name, category }) => {
    addProduct({ brandName, name, category })
      .then(data => {
        this.setState(prevState => {
          const newProducts = [...prevState.products, { brandName, name }]
          const newCategories = prevState.categories.map(category => {
            if (category._id === data._id) {
              return data
            } else {
              return category
            }
          })
          return ({
            products: newProducts,
            categories: newCategories
          })
        })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onEditProduct = (id, attributes) => {
    updateProduct(id, attributes)
      .then(updatedProduct => {
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
          const updatedProducts = prevState.products.map(product => {
            if (product._id !== removedProduct._id) {
              return product
            }
          })
          // const updatedCategories = prevState.categories.map(category => {
          //   if (category._id === removedProduct.category) {
          //     let index = category.products.filter(product => {
          //       category.indexOf(product._id === removedProduct._id)
          //     })
          //     console.log
          //     category.splice(index, 1)
          //   }
          // })

          return ({
            products: updatedProducts,
            // categories: updatedCategories

          })
        })
        this.onDeleteWishlistProduct(removedProduct._id)
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

  // Categories


  render() {
    const { decodedToken, products, wishlistProducts, categories, error } = this.state
    const signedIn = !!decodedToken

    const requireAuth = (render) => (props) => (
      !signedIn ? (
        <Redirect to='/signin' />
      ) : (
          render(props)
        )
    )

    return (
      <Router>
        <div className="App" >

          {/* Nav */}
          <PrimaryNav
            signedIn={signedIn}
            onSignOut={this.onSignOut}
          />
          <br />
          {
            error && <Error error={error} />
          }

          {/* Switch */}
          <Switch>

            {/* Home */}
            <Route path='/' exact render={() => (
              <Fragment>
                <div className='jumbotron text-center'>
                  <h1>React Shop</h1>
                </div>
                <div className='text-center'>
                  <h4>Now Delivering: </h4>
                  <h5>Shipping trillions of new products</h5>
                </div>
              </Fragment>
            )} />

            {/* Account */}
            <Route path='/' exact render={requireAuth(() => (
              <Fragment>
                <hr />
                <p className='text-center'>Signed in as: <strong>{decodedToken.email}</strong></p>
                <hr />
              </Fragment>
            ))} />

            {/* Categories */}
            <Route path='/categories' exact render={requireAuth(() => (
              <Fragment>
                <h3 className='text-center'>Categories</h3>
                {
                  categories && categories.map(category => {
                    return (
                      <Category
                        signedIn={signedIn}
                        categoryName={category.categoryName}
                        categories={categories}
                        products={category.products}
                        onEditProduct={this.onEditProduct}
                        onDeleteProduct={this.onDeleteProduct}
                        onAddToWishlist={this.onAddToWishlist}
                      />
                    )
                  })
                }
              </Fragment>
            ))} />

            {/* Products */}
            <Route path='/products' exact render={() => (
              <Fragment>
                <h4 className='text-center'>Products</h4>
                <br />
                {/* Product Form */}
                {
                  signedIn &&
                  <Fragment>
                    <p className='text-center'><strong>Add New Product</strong></p>
                    <NewProductForm
                      categories={categories}
                      onAddProduct={this.onAddProduct} />
                    <br />
                    <h4 className='text-center'>Products</h4>
                    <hr />
                  </Fragment>
                }
                {
                  !!products &&
                  <ProductListing
                    signedIn={signedIn}
                    categories={categories}
                    products={products}
                    onEditProduct={this.onEditProduct}
                    onDeleteProduct={this.onDeleteProduct}
                    onAddToWishlist={this.onAddToWishlist}
                  />
                }
              </Fragment>
            )} />

            {/* Wishlist */}
            <Route path='/wishlist' exact render={requireAuth(() => (
              <Fragment>
                {wishlistProducts &&
                  <Wishlist
                    wishlistProducts={wishlistProducts}
                    onDeleteWishlistProduct={this.onDeleteWishlistProduct}
                  />
                }
              </Fragment>
            ))} />

            {/* Signin */}
            <Route path='/signin' exact render={() => (
              signedIn ? (
                <Redirect to='/products' />
              ) : (
                  <Fragment>
                    <SignInForm
                      onSignIn={this.onSignIn}
                    />
                    <br />
                    <p>Don't have an account?</p>
                    <Link to='/signup'
                      className='btn btn-primary'
                    >
                      Sign Up
                          </Link>
                  </Fragment>
                )
            )} />

            {/* Sign up */}
            <Route path='/signup' exact render={() => (
              <Fragment>
                <SignUpForm
                  onSignUp={this.onSignUp}
                />
                <br />
                <Link to='/signin'
                  className='btn btn-primary'
                >
                  Back to Sign in
                      </Link>
              </Fragment>
            )} />

            {/* Route not found */}
            <Route render={({ location }) => (
              <h2
                className='text-center text-danger'
              >
                Page not found: {location.pathname}
              </h2>
            )} />

          </Switch>
        </div>
      </Router>
    );
  }

  load() {
    const saveError = (error) => {
      this.setState({ error })
    }

    // load for everyone
    listProducts()
      .then(products => {
        this.setState({ products })
      })
      .catch(saveError)

    listCategories()
      .then(categories => {
        this.setState({ categories })
      })
      .catch(saveError)

    const { decodedToken } = this.state
    const signedIn = !!decodedToken

    if (signedIn) {
      showWishlist()
        .then(wishlistProducts => {
          this.setState({ wishlistProducts })
        })
        .catch(saveError)
    } else {
      // Clear sing-in-only data
      this.setState({
        wishlistProducts: null
      })
    }
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
      this.setState({
        error: null
      })
    }
  }
}

export default App;
