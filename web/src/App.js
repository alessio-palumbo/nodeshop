import React, { Component } from 'react';
// import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
import './App.css';
import SignInForm from './components/SignInForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2>Now Delivering: Shipping trillions of new products</h2>
        <SignInForm />
      </div>
    );
  }
}

export default App;
