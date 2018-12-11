import './App.min.css'
import React, { Component } from 'react';
import AddressContainer from './containers/AddressContainer/AddressContainer'

class App extends Component {

  render() {
    return (
      <main className="container">

        <AddressContainer/>

      </main>
    )
  }
}

export default App;
