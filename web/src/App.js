import React, { Component } from 'react';
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import SignInForm from './components/SignInForm'
import { signIn } from './api/auth'

class App extends Component {
  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then(data => {
        console.log('signed in', data)
      })
  }

  render() {
    return (
      <div className="App">
        <div className='jumbotron'>
          <h1 className='text-center'>Yarra</h1>
          <h4>Now Delivering: Shipping trillions of new products</h4>
        </div>
        <SignInForm
          onSignIn={this.onSignIn}
        />
      </div>
    );
  }
}

export default App;
