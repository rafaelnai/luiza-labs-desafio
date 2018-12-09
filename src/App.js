import React, { Component } from 'react';
import AddressQuery from './components/AddressQuery/AddressQuery'
import AddressMap from './components/AddressMap/AddressMap'

class App extends Component {

  render() {
    return (
      <main className="container">

        <AddressQuery/>
        <AddressMap/>

      </main>
    );
  }

}

export default App;
