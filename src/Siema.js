import React from 'react';

class Siema extends React.Component {
  constructor(props) {
    super(props);

    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.slideToCurrent = this.slideToCurrent.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.currentIndex = 0;
  }

  componentDidMount() {
    this.selectorWidth = this.container.getBoundingClientRect().width;
    this.innerElements = [].slice.call(this.slider.children);

    this.slider.style.width = `${this.selectorWidth * this.innerElements.length}px`;
    this.innerElements.forEach((element) => {
      element.style.width = `${100 / this.innerElements.length}%`;
      element.style.textAlign = 'center';
    });
  }

  handlePreviousClick() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.slideToCurrent();
  }

  handleNextClick() {
    this.currentIndex = Math.min(this.innerElements.length - 1, this.currentIndex + 1);
    this.slideToCurrent();
  }

  slideToCurrent() {
    const newTransformStyle = this.selectorWidth * this.currentIndex;
    this.slider.style.transform = `translateX(-${newTransformStyle}px)`;
    this.slider.style.transition = `all 200ms ease-in-out`;
    this.slider.addEventListener('transitionend', this.removeTransition);
  }

  removeTransition() {
    this.slider.removeEventListener('transitionend', this.removeTransition);
    this.slider.style.transition = 'none';
  }

  renderChildren() {
    // only render 3 elements
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        key: index,
        style: { float: 'left' },
      })
    });
  }

  render() {
    return (
      <div
        ref={(container) => this.container = container}
        style={{ overflow: 'hidden' }}
      >
        <div
        ref={(slider) => this.slider = slider}
        >
          {this.renderChildren()}
        </div>
        <div>
          <button onClick={this.handlePreviousClick}>Previous</button>
          <button onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    );
  }
}

export default Siema;
