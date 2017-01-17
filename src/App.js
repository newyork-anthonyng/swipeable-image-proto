import React, { Component } from 'react';
import Siema from './Siema2';

class App extends Component {
  constructor(props) {
    super(props);
    this.images = [
      <img src="https://unsplash.it/600/350?image=10" alt="slide" />,
      <img src="https://unsplash.it/600/350?image=11" alt="slide" />,
      <img src="https://unsplash.it/600/350?image=12" alt="slide" />,
      <img src="https://unsplash.it/600/350?image=13" alt="slide" />,
      <img src="https://unsplash.it/600/350?image=14" alt="slide" />,
      <img src="https://unsplash.it/600/350?image=15" alt="slide" />,
      <img src="https://unsplash.it/600/350?image=16" alt="slide" />,
    ];

    this.handleClick = this.handleClick.bind(this);
    this.offset = 0;
  }

  handleClick() {
    this.offset += 100;
    this.container.style.transform = `translateX(${this.offset}px)`;
  }

  render() {
    return (
      <div className="App">
        <div ref={(container) => this.container = container} />
        <button onClick={this.handleClick}>Click Me</button>
        <div style={{ width: '500px', margin: '0 auto' }}>
          <Siema>
            {this.images.map((image, index) => {
              return (
                <div key={index}>
                  {image}
                </div>
              );
            })}
          </Siema>
        </div>
      </div>
    );
  }
}

export default App;
