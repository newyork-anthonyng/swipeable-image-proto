import React from 'react';

class Siema extends React.Component {
  constructor(props) {
    super(props);

    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.slideToCurrent = this.slideToCurrent.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
    this.styleChildren = this.styleChildren.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.selectorWidth = this.container.getBoundingClientRect().width;
    this.styleChildren();
    this.slider.style.width = `${this.selectorWidth * this.innerElements.length}px`;
  }

  styleChildren() {
    this.innerElements = [].slice.call(this.slider.children);
    this.innerElements.forEach((element) => {
      element.style.width = `${100 / this.innerElements.length}%`;
      element.style.textAlign = 'center';
    });
  }

  handlePreviousClick() {
    this.setState({
      currentIndex: Math.max(0, this.state.currentIndex - 1),
    }, this.slideToCurrent);
  }

  handleNextClick() {
    this.setState({
      currentIndex: Math.min(this.props.children.length - 1, this.state.currentIndex + 1)
    }, this.slideToCurrent);
  }

  slideToCurrent() {
    let newTransformStyle;
    if (this.state.currentIndex === 0) {
      newTransformStyle = 0;
    } else if (this.state.currentIndex === 1) {
      newTransformStyle = this.selectorWidth;
    } else {
      newTransformStyle = this.selectorWidth * 2;
    }

    this.slider.style.transform = `translateX(-${newTransformStyle}px)`;
    this.slider.style.transition = `all 200ms ease-in-out`;
    this.slider.addEventListener('transitionend', this.removeTransition);
  }

  removeTransition() {
    if (this.state.currentIndex === 0) {
      this.slider.style.transform = `translateX(-0px)`;
    } else {
      this.slider.style.transform = `translateX(-${this.selectorWidth}px)`;
    }


    this.slider.removeEventListener('transitionend', this.removeTransition);
    this.slider.style.transition = 'none';
  }

  renderChildren() {
    // always render 3 elements
    if (this.state.currentIndex === 0) {
      return React.Children.map(this.props.children, (child, index) => {
        if (index === 0 || index === 1 || index === 2) {
          return React.cloneElement(child, {
            key: index,
            style: {
              float: 'left',
              width: `${100 / 3}%`,
              textAlign: 'center',
            },
          });
        }
      });
    } else {
      return React.Children.map(this.props.children, (child, index) => {
        if (Math.abs(index - this.state.currentIndex) <= 1) {
          return React.cloneElement(child, {
            key: index,
            style: {
              float: 'left',
              width: `${100 / 3}%`,
              textAlign: 'center',
            },
          });
        }
      });
    }
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
