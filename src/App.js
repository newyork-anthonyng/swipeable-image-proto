import React, { Component } from 'react';
import Siema from './Siema';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ width: '500px', margin: '0 auto' }}>
          <Siema>
            <div><h1>1</h1></div>
            <div><h1>2</h1></div>
            <div><h1>3</h1></div>
            <div><h1>4</h1></div>
            <div><h1>5</h1></div>
          </Siema>
        </div>
      </div>
    );
  }
}

export default App;
